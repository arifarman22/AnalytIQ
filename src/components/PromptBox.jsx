import React from 'react';
import { Box, Typography, Button, Chip, Stack, TextField, CircularProgress } from '@mui/material';
import { AutoAwesome, Send } from '@mui/icons-material';

const prompts = [
  'Comprehensive EDA',
  'Key trends and patterns',
  'Correlations between features',
  'Outliers or anomalies',
  'Data quality issues',
  'Run ML prediction',
];

const PromptBox = ({ prompt, onPromptChange, onAnalyze, loading, columns, datasetId }) => (
  <Box className="fade-in" sx={{ background: 'rgba(255,255,255,.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,.04)', p: { xs: 2.5, md: 3.5 } }}>
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
      <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(229,9,20,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AutoAwesome sx={{ fontSize: 18, color: '#E50914' }} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 500, fontSize: '.95rem', lineHeight: 1.2 }}>Ask Your Data</Typography>
        <Typography sx={{ color: '#6b7280', fontSize: '.78rem', fontWeight: 300 }}>Describe what you want to analyze</Typography>
      </Box>
    </Stack>

    {columns?.length > 0 && (
      <Box sx={{ mb: 2.5 }}>
        <Typography sx={{ color: '#6b7280', fontSize: '.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, mb: .75 }}>Columns</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .5 }}>
          {columns.map((c, i) => <Chip key={i} label={c} size="small" sx={{ fontSize: '.72rem', height: 24, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', color: '#9ca3af' }} />)}
        </Box>
      </Box>
    )}

    <TextField
      multiline rows={3} fullWidth placeholder="e.g., What are the key trends? Run a prediction on the target column..."
      value={prompt} onChange={e => onPromptChange(e.target.value)}
      sx={{ mb: 2, '& .MuiOutlinedInput-root': { background: 'rgba(0,0,0,.3)' } }}
    />

    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ color: '#6b7280', fontSize: '.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, mb: .75 }}>Quick prompts</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .5 }}>
        {prompts.map((p, i) => (
          <Chip key={i} label={p} size="small" clickable onClick={() => onPromptChange(p)}
            sx={{ fontSize: '.75rem', height: 26, background: 'transparent', border: '1px solid rgba(255,255,255,.06)', color: '#9ca3af', transition: 'all .2s', '&:hover': { borderColor: 'rgba(229,9,20,.3)', color: '#E50914', background: 'rgba(229,9,20,.04)' } }}
          />
        ))}
      </Box>
    </Box>

    <Button onClick={onAnalyze} disabled={loading || !prompt.trim() || !datasetId} fullWidth
      endIcon={loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <Send sx={{ fontSize: 18 }} />}
      sx={{ py: 1.3, background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25', transform: 'translateY(-1px)' }, '&:disabled': { background: '#222', color: '#555' }, transition: 'all .25s ease' }}>
      {loading ? 'Analyzing…' : 'Run Analysis'}
    </Button>
  </Box>
);
export default PromptBox;
