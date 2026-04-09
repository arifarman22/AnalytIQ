import React, { useCallback, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, LinearProgress } from '@mui/material';
import { CloudUpload, InsertDriveFile, CheckCircle } from '@mui/icons-material';

const FileUploader = ({ file, onFileChange, onUpload, loading }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrag = useCallback((e, over) => { e.preventDefault(); setDragOver(over); }, []);
  const handleDrop = useCallback(e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]); }, [onFileChange]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <CloudUpload sx={{ fontSize: 30, color: '#6C3AFF' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: .5 }}>Upload Your Dataset</Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>CSV, Excel (.xlsx, .xls) — up to 50MB</Typography>
      </Box>

      <Box
        onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        sx={{
          border: '2px dashed', borderColor: dragOver ? '#6C3AFF' : file ? '#a78bfa' : '#e2e8f0',
          borderRadius: 4, p: { xs: 4, md: 5 }, textAlign: 'center', cursor: 'pointer',
          background: dragOver ? '#ede9fe' : file ? '#faf5ff' : '#fafbfc',
          transition: 'all .25s ease',
          '&:hover': { borderColor: '#a78bfa', background: '#faf5ff' },
        }}
      >
        {file ? (
          <Stack alignItems="center" spacing={1}>
            <InsertDriveFile sx={{ fontSize: 40, color: '#6C3AFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{file.name}</Typography>
            <Chip label={`${(file.size / 1024).toFixed(1)} KB`} size="small" sx={{ background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Click or drop to replace</Typography>
          </Stack>
        ) : (
          <Stack alignItems="center" spacing={1}>
            <CloudUpload sx={{ fontSize: 44, color: '#cbd5e1' }} />
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#64748b' }}>Drag & drop your file here</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>or click to browse</Typography>
          </Stack>
        )}
        <input id="file-input" type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) onFileChange(e.target.files[0]); }} accept=".csv,.xlsx,.xls" />
      </Box>

      {file && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {loading && <LinearProgress sx={{ mb: 2, borderRadius: 2 }} />}
          <Button variant="contained" onClick={onUpload} disabled={loading} startIcon={loading ? null : <CheckCircle />} fullWidth sx={{ py: 1.5, fontSize: '.95rem' }}>
            {loading ? 'Uploading…' : 'Upload & Continue'}
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default FileUploader;
