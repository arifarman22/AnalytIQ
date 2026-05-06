import React, { useCallback, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, LinearProgress } from '@mui/material';
import { CloudUpload, InsertDriveFile, CheckCircle } from '@mui/icons-material';

const FileUploader = ({ file, onFileChange, onUpload, loading }) => {
  const [dragOver, setDragOver] = useState(false);
  const handleDrag = useCallback((e, over) => { e.preventDefault(); setDragOver(over); }, []);
  const handleDrop = useCallback(e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]); }, [onFileChange]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }} className="fade-in">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(229,9,20,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <CloudUpload sx={{ fontSize: 26, color: '#E50914' }} />
        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: '1.2rem', mb: .5 }}>Upload Dataset</Typography>
        <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300 }}>CSV, Excel — up to 50MB</Typography>
      </Box>

      <Box
        onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        sx={{
          border: '1px dashed', borderColor: dragOver ? '#E50914' : file ? 'rgba(229,9,20,.3)' : 'rgba(255,255,255,.08)',
          borderRadius: '12px', p: { xs: 4, md: 5 }, textAlign: 'center', cursor: 'pointer',
          background: dragOver ? 'rgba(229,9,20,.04)' : 'rgba(255,255,255,.01)',
          transition: 'all .25s ease',
          '&:hover': { borderColor: 'rgba(229,9,20,.3)', background: 'rgba(229,9,20,.02)' },
        }}
      >
        {file ? (
          <Stack alignItems="center" spacing={1}>
            <InsertDriveFile sx={{ fontSize: 36, color: '#E50914' }} />
            <Typography sx={{ fontWeight: 500, fontSize: '.9rem' }}>{file.name}</Typography>
            <Chip label={`${(file.size / 1024).toFixed(1)} KB`} size="small" sx={{ background: 'rgba(229,9,20,.08)', color: '#E50914', fontSize: '.75rem' }} />
          </Stack>
        ) : (
          <Stack alignItems="center" spacing={1}>
            <CloudUpload sx={{ fontSize: 36, color: '#6b7280' }} />
            <Typography sx={{ color: '#9ca3af', fontWeight: 400, fontSize: '.9rem' }}>Drag & drop or click to browse</Typography>
          </Stack>
        )}
        <input id="file-input" type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) onFileChange(e.target.files[0]); }} accept=".csv,.xlsx,.xls" />
      </Box>

      {file && (
        <Box sx={{ mt: 3 }}>
          {loading && <LinearProgress sx={{ mb: 2, borderRadius: 2, background: 'rgba(255,255,255,.04)', '& .MuiLinearProgress-bar': { background: '#E50914' } }} />}
          <Button onClick={onUpload} disabled={loading} startIcon={!loading && <CheckCircle sx={{ fontSize: 18 }} />} fullWidth
            sx={{ py: 1.4, background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25', transform: 'translateY(-1px)' }, '&:disabled': { background: '#333', color: '#666' }, transition: 'all .25s ease' }}>
            {loading ? 'Uploading…' : 'Upload & Continue'}
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default FileUploader;
