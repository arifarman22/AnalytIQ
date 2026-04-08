import React, { useCallback } from 'react';

const FileUploader = ({ file, onFileChange, onUpload, loading, uploadResponse }) => {
  const dragOver = useCallback(e => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }, []);
  const dragLeave = useCallback(e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); }, []);
  const drop = useCallback(e => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); if (e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]); }, [onFileChange]);
  const select = e => { if (e.target.files[0]) onFileChange(e.target.files[0]); };

  return (
    <div className="file-uploader">
      <h2>Upload Your Dataset</h2>
      <p>Supported formats: CSV, Excel (.xlsx, .xls)</p>
      <div className="upload-area" onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop} onClick={() => document.getElementById('file-input').click()}>
        {file ? (
          <div><p style={{ fontSize: '2rem', marginBottom: '.5rem' }}>📄</p><p style={{ fontWeight: 600, color: '#0f172a' }}>{file.name}</p><p style={{ fontSize: '.85rem', color: '#94a3b8', marginTop: '.25rem' }}>Ready to upload</p></div>
        ) : (
          <div><p style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>☁️</p><p style={{ fontWeight: 500, color: '#64748b' }}>Drag & drop your file here</p><p style={{ fontSize: '.85rem', color: '#94a3b8', marginTop: '.25rem' }}>or click to browse</p></div>
        )}
        <input id="file-input" type="file" className="file-input" onChange={select} accept=".csv,.xlsx,.xls" />
      </div>
      {file && <button onClick={onUpload} disabled={loading} className="upload-btn">{loading && <span className="loading-spinner" />}{loading ? 'Uploading...' : 'Upload Dataset'}</button>}
      {uploadResponse && (
        <div className="upload-success">
          <h3>✓ Upload Successful!</h3>
          <p><strong>Filename:</strong> {uploadResponse.filename}</p>
          <p><strong>Dataset ID:</strong> {uploadResponse.dataset_id}</p>
          <p><strong>Dimensions:</strong> {uploadResponse.rows} rows × {uploadResponse.cols} columns</p>
          <p><strong>Size:</strong> {(uploadResponse.file_size_bytes / 1024 / 1024).toFixed(2)} MB</p>
          {uploadResponse.columns && <div><p><strong>Columns:</strong></p><div className="column-list">{uploadResponse.columns.map((c, i) => <span key={i} className="column-pill">{c}</span>)}</div></div>}
        </div>
      )}
    </div>
  );
};
export default FileUploader;
