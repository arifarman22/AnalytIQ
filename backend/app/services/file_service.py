import os
import io
import uuid
import pandas as pd
from typing import Optional
from datetime import datetime
from . import schemas
from ..config import settings

class FileValidationError(Exception):
    pass

class FileSizeExceededError(Exception):
    pass

class DatasetNotFoundError(Exception):
    pass

class FileService:
    def __init__(self):
        self.data_dir = settings.DATA_DIR
    
    async def process_uploaded_file(self, file) -> schemas.UploadResponse:
        """Validate and process an uploaded file"""
        # Validate file type
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in settings.SUPPORTED_FILE_TYPES:
            raise FileValidationError(
                f"Unsupported file type. Supported types: {', '.join(settings.SUPPORTED_FILE_TYPES)}"
            )
        
        # Read file contents
        contents = await file.read()
        
        # Validate file size
        if len(contents) > settings.MAX_FILE_SIZE:
            raise FileSizeExceededError(
                f"File too large. Maximum size is {settings.MAX_FILE_SIZE//(1024*1024)}MB"
            )
        
        # Generate unique dataset ID
        dataset_id = str(uuid.uuid4())
        save_path = os.path.join(self.data_dir, f"{dataset_id}{file_ext}")
        
        # Save file
        with open(save_path, 'wb') as f:
            f.write(contents)
        
        # Read into pandas for metadata extraction
        try:
            if file_ext == '.csv':
                df = pd.read_csv(io.BytesIO(contents))
            else:
                df = pd.read_excel(io.BytesIO(contents))
        except Exception as e:
            # Clean up the saved file if reading fails
            os.remove(save_path)
            raise FileValidationError(f"Error parsing file: {str(e)}")
        
        return schemas.UploadResponse(
            dataset_id=dataset_id,
            filename=file.filename,
            rows=len(df),
            cols=len(df.columns),
            columns=list(df.columns),
            file_size_bytes=len(contents),
            uploaded_at=datetime.now().isoformat()
        )
    
    async def load_dataset(self, dataset_id: str) -> pd.DataFrame:
        """Load a dataset by ID"""
        file_path = self._find_dataset_file(dataset_id)
        if not file_path:
            raise DatasetNotFoundError()
        
        try:
            if file_path.endswith('.csv'):
                return pd.read_csv(file_path)
            else:
                return pd.read_excel(file_path)
        except Exception as e:
            raise FileValidationError(f"Error loading dataset: {str(e)}")
    
    async def get_dataset_metadata(self, dataset_id: str) -> schemas.DatasetMetadataResponse:
        """Get metadata for a dataset"""
        file_path = self._find_dataset_file(dataset_id)
        if not file_path:
            raise DatasetNotFoundError()
        
        # Load the dataset to get metadata
        df = await self.load_dataset(dataset_id)
        file_stats = os.stat(file_path)
        
        return schemas.DatasetMetadataResponse(
            dataset_id=dataset_id,
            filename=os.path.basename(file_path),
            rows=len(df),
            cols=len(df.columns),
            columns=list(df.columns),
            file_size_bytes=file_stats.st_size,
            uploaded_at=datetime.fromtimestamp(file_stats.st_ctime).isoformat(),
            file_path=file_path
        )
    
    async def delete_dataset(self, dataset_id: str) -> bool:
        """Delete a dataset file"""
        file_path = self._find_dataset_file(dataset_id)
        if not file_path:
            raise DatasetNotFoundError()
        
        try:
            os.remove(file_path)
            return True
        except OSError:
            return False
    
    def _find_dataset_file(self, dataset_id: str) -> Optional[str]:
        """Find the dataset file by ID"""
        for ext in settings.SUPPORTED_FILE_TYPES:
            file_path = os.path.join(self.data_dir, f"{dataset_id}{ext}")
            if os.path.exists(file_path):
                return file_path
        return None