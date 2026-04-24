import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, Button, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { History, Analytics, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AnalysisHistory = () => {
  const t = useTheme();
  const c = t.palette.custom;
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { api.get('/analyses/').then(r => setAnalyses(r.data)).catch(e => setError(e.safeMessage || 'Failed to load')).finally(() => setLoading(false)); }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6C3AFF' }} /></Box>;

  return (
    <Box sx={{ py: 4, background: c.bgSoft, minHeight: 'calc(100vh - 70px)', transition: 'background .3s ease' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Analysis History</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>{analyses.length} analyses completed</Typography>
          </Box>
          <Button component={Link} to="/dashboard" variant="contained" endIcon={<ArrowForward />} sx={{ background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)' }}>New Analysis</Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {!analyses.length ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ width: 60, height: 60, borderRadius: 3, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.accentLight }}><Analytics sx={{ fontSize: 28, color: '#6C3AFF' }} /></Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>No analyses yet</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Upload a dataset and run your first analysis</Typography>
              <Button component={Link} to="/dashboard" variant="contained" sx={{ background: 'linear-gradient(135deg,#6C3AFF,#a855f7)' }}>Get Started</Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2.5}>
            {analyses.map(a => (
              <Grid item xs={12} md={6} key={a.id}>
                <Card sx={{ transition: 'all .3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: c.shadowHover } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Chip icon={<History sx={{ fontSize: 14 }} />} label={new Date(a.created_at).toLocaleDateString()} size="small" variant="outlined" sx={{ borderColor: c.border, fontSize: '.75rem' }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }} noWrap>{a.prompt}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Dataset: {a.dataset_id.slice(0, 8)}...</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
export default AnalysisHistory;
