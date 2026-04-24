import React from 'react';
import { Box, Typography, Button, Chip, Stack, TextField, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AutoAwesome, Send } from '@mui/icons-material';

const prompts = [
  'Comprehensive exploratory data analysis',
  'Key trends and patterns',
  'Correlations between features',
  'Outliers or anomalies',
  'Data quality issues',
  'Categorical vs numerical relationships',
];

const PromptBox = ({ prompt, onPromptChange, onAnalyze, loading, columns, datasetId }) => {
  const t = useTheme();
  const c = t.palette.custom;
  return (
    <Box className="slide-up" sx={{ background: c.card, borderRadius: 5, border: `1px solid ${c.borderLight}`, boxShadow: c.shadow, p: { xs: 2.5, md: 3.5 }, transition: 'all .3s ease' }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2.5, background: c.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AutoAwesome sx={{ fontSize: 20, color: '#6C3AFF' }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Ask Your Data</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Describe what you want to analyze in plain English</Typography>
        </Box>
      </Stack>

      {columns?.length > 0 && (
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5, display: 'block', mb: .75 }}>Available Columns</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .5 }}>
            {columns.map((col, i) => <Chip key={i} label={col} size="small" sx={{ fontSize: '.75rem', height: 26, background: c.accentLight, color: '#6C3AFF' }} />)}
          </Box>
        </Box>
      )}

      <TextField
        multiline rows={3} fullWidth placeholder="e.g., What are the key trends? Any correlations between features?"
        value={prompt} onChange={e => onPromptChange(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': { background: c.bgSoft } }}
      />

      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: .75 }}>Quick Prompts</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .5 }}>
          {prompts.map((p, i) => (
            <Chip key={i} label={p} size="small" variant="outlined" clickable onClick={() => onPromptChange(p)}
              sx={{ fontSize: '.78rem', borderColor: c.border, color: 'text.secondary', transition: 'all .2s ease', '&:hover': { borderColor: '#a78bfa', color: '#6C3AFF', background: c.accentLight } }}
            />
          ))}
        </Box>
      </Box>

      <Button variant="contained" onClick={onAnalyze} disabled={loading || !prompt.trim() || !datasetId} fullWidth
        endIcon={loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <Send />}
        sx={{ py: 1.4, fontSize: '.95rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)', '&:hover': { boxShadow: '0 6px 24px rgba(108,58,255,.35)', transform: 'translateY(-1px)' }, transition: 'all .3s ease' }}
      >
        {loading ? 'Analyzing…' : 'Run Analysis'}
      </Button>
    </Box>
  );
};
export default PromptBox;
