import React, { useCallback, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CloudUpload, InsertDriveFile, CheckCircle } from '@mui/icons-material';

const FileUploader = ({ file, onFileChange, onUpload, loading }) => {
  const t = useTheme();
  const c = t.palette.custom;
  const [dragOver, setDragOver] = useState(false);

  const handleDrag = useCallback((e, over) => { e.preventDefault(); setDragOver(over); }, []);
  const handleDrop = useCallback(e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]); }, [onFileChange]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }} className="fade-in">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: c.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, animation: 'pulse-glow 3s ease-in-out infinite' }}>
          <CloudUpload sx={{ fontSize: 30, color: '#6C3AFF' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: .5 }}>Upload Your Dataset</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>CSV, Excel (.xlsx, .xls) — up to 50MB</Typography>
      </Box>

      <Box
        onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        sx={{
          border: '2px dashed', borderColor: dragOver ? '#6C3AFF' : file ? '#a78bfa' : c.border,
          borderRadius: 4, p: { xs: 4, md: 5 }, textAlign: 'center', cursor: 'pointer',
          background: dragOver ? c.accentLight : file ? c.cardHover : c.bgSoft,
          transition: 'all .3s ease',
          '&:hover': { borderColor: '#a78bfa', background: c.cardHover },
        }}
      >
        {file ? (
          <Stack alignItems="center" spacing={1}>
            <InsertDriveFile sx={{ fontSize: 40, color: '#6C3AFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{file.name}</Typography>
            <Chip label={`${(file.size / 1024).toFixed(1)} KB`} size="small" sx={{ background: c.accentLight, color: '#6C3AFF', fontWeight: 600 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Click or drop to replace</Typography>
          </Stack>
        ) : (
          <Stack alignItems="center" spacing={1}>
            <CloudUpload sx={{ fontSize: 44, color: 'text.secondary' }} />
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>Drag & drop your file here</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>or click to browse</Typography>
          </Stack>
        )}
        <input id="file-input" type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) onFileChange(e.target.files[0]); }} accept=".csv,.xlsx,.xls" />
      </Box>

      {file && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {loading && <LinearProgress sx={{ mb: 2, borderRadius: 2, background: c.bgMuted, '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#6C3AFF,#a855f7)' } }} />}
          <Button variant="contained" onClick={onUpload} disabled={loading} startIcon={loading ? null : <CheckCircle />} fullWidth
            sx={{ py: 1.5, fontSize: '.95rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)', '&:hover': { boxShadow: '0 6px 24px rgba(108,58,255,.35)', transform: 'translateY(-1px)' }, transition: 'all .3s ease' }}>
            {loading ? 'Uploading…' : 'Upload & Continue'}
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default FileUploader;
