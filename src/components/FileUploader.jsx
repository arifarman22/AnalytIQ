import React, { useCallback } from 'react';

const FileUploader = ({ file, onFileChange, onUpload, loading, uploadResponse }) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  }, [onFileChange]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="file-uploader">
      <h2>Upload Your Dataset</h2>
      <p>Supported formats: CSV, Excel (.xlsx, .xls)</p>
      
      <div 
        className="upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        {file ? (
          <div>
            <p>📄 <strong>{file.name}</strong></p>
            <p>Ready to upload</p>
          </div>
        ) : (
          <div>
            <p>📁 Drag & drop your file here</p>
            <p>or click to browse</p>
          </div>
        )}
        
        <input
          id="file-input"
          type="file"
          className="file-input"
          onChange={handleFileSelect}
          accept=".csv,.xlsx,.xls"
        />
      </div>

      {file && (
        <button 
          onClick={onUpload} 
          disabled={loading}
          className="upload-btn"
        >
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Uploading...' : 'Upload Dataset'}
        </button>
      )}

      {uploadResponse && (
        <div className="upload-success">
          <h3>✓ Upload Successful!</h3>
          <p><strong>Filename:</strong> {uploadResponse.filename}</p>
          <p><strong>Dataset ID:</strong> {uploadResponse.dataset_id}</p>
          <p><strong>Dimensions:</strong> {uploadResponse.rows} rows × {uploadResponse.cols} columns</p>
          <p><strong>File Size:</strong> {(uploadResponse.file_size_bytes / 1024 / 1024).toFixed(2)} MB</p>
          
          {uploadResponse.columns && (
            <div>
              <p><strong>Columns:</strong></p>
              <div className="column-list">
                {uploadResponse.columns.map((col, index) => (
                  <span key={index} className="column-pill">{col}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;