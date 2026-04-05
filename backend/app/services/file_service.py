import os
import io
import uuid
import pandas as pd
from typing import Optional
from datetime import datetime
from app.schemas import UploadResponse, DatasetMetadataResponse
from app.config import settings


class FileValidationError(Exception):
    pass

class FileSizeExceededError(Exception):
    pass

class DatasetNotFoundError(Exception):
    pass


class FileService:
    def __init__(self):
        self.data_dir = settings.DATA_DIR

    async def process_uploaded_file(self, file) -> UploadResponse:
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in settings.SUPPORTED_FILE_TYPES:
            raise FileValidationError(f"Unsupported file type. Supported: {', '.join(settings.SUPPORTED_FILE_TYPES)}")

        contents = await file.read()

        if len(contents) > settings.MAX_FILE_SIZE:
            raise FileSizeExceededError(f"File too large. Max {settings.MAX_FILE_SIZE // (1024 * 1024)}MB")

        dataset_id = str(uuid.uuid4())
        save_path = os.path.join(self.data_dir, f"{dataset_id}{file_ext}")

        with open(save_path, 'wb') as f:
            f.write(contents)

        try:
            df = pd.read_csv(io.BytesIO(contents)) if file_ext == '.csv' else pd.read_excel(io.BytesIO(contents))
        except Exception as e:
            os.remove(save_path)
            raise FileValidationError(f"Error parsing file: {str(e)}")

        return UploadResponse(
            dataset_id=dataset_id,
            filename=file.filename,
            rows=len(df),
            cols=len(df.columns),
            columns=list(df.columns),
            file_size_bytes=len(contents),
            uploaded_at=datetime.now().isoformat()
        )

    async def load_dataset(self, dataset_id: str) -> pd.DataFrame:
        file_path = self._find_dataset_file(dataset_id)
        if not file_path:
            raise DatasetNotFoundError()
        return pd.read_csv(file_path) if file_path.endswith('.csv') else pd.read_excel(file_path)

    async def delete_dataset(self, dataset_id: str) -> bool:
        file_path = self._find_dataset_file(dataset_id)
        if not file_path:
            raise DatasetNotFoundError()
        os.remove(file_path)
        return True

    def _find_dataset_file(self, dataset_id: str) -> Optional[str]:
        for ext in settings.SUPPORTED_FILE_TYPES:
            file_path = os.path.join(self.data_dir, f"{dataset_id}{ext}")
            if os.path.exists(file_path):
                return file_path
        return None
