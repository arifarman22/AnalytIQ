import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, Button, CircularProgress, Alert } from '@mui/material';
import { History, Analytics, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { api.get('/analyses/').then(r => setAnalyses(r.data)).catch(e => setError(e.response?.data?.detail || 'Failed to load')).finally(() => setLoading(false)); }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6C3AFF' }} /></Box>;

  return (
    <Box sx={{ py: 4, background: '#fafbfc', minHeight: 'calc(100vh - 70px)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box><Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Analysis History</Typography><Typography variant="body1" sx={{ color: '#64748b' }}>{analyses.length} analyses completed</Typography></Box>
          <Button component={Link} to="/dashboard" variant="contained" endIcon={<ArrowForward />}>New Analysis</Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {!analyses.length ? (
          <Card sx={{ border: '1px solid #f1f5f9' }}>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Box sx={{ width: 60, height: 60, borderRadius: 3, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ede9fe' }}><Analytics sx={{ fontSize: 28, color: '#6C3AFF' }} /></Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>No analyses yet</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>Upload a dataset and run your first analysis</Typography>
              <Button component={Link} to="/dashboard" variant="contained">Get Started</Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2.5}>
            {analyses.map(a => (
              <Grid item xs={12} md={6} key={a.id}>
                <Card sx={{ border: '1px solid #f1f5f9', transition: 'all .25s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 30px rgba(108,58,255,.06)' } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Chip icon={<History sx={{ fontSize: 14 }} />} label={new Date(a.created_at).toLocaleDateString()} size="small" variant="outlined" sx={{ borderColor: '#e2e8f0', fontSize: '.75rem' }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }} noWrap>{a.prompt}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Dataset: {a.dataset_id.slice(0, 8)}...</Typography>
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
