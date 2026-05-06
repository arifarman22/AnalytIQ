import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Chip, Button, CircularProgress, Alert } from '@mui/material';
import { History, Analytics, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { api.get('/analyses/').then(r => setAnalyses(r.data)).catch(e => setError(e.safeMessage || 'Failed to load')).finally(() => setLoading(false)); }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#E50914' }} /></Box>;

  return (
    <Box sx={{ py: 4, width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1.3rem', mb: .25 }}>History</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300 }}>{analyses.length} analyses</Typography>
          </Box>
          <Button component={Link} to="/dashboard" endIcon={<ArrowForward sx={{ fontSize: 16 }} />} sx={{ background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25' } }}>New Analysis</Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        {!analyses.length ? (
          <Card sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)' }}>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
              <Analytics sx={{ fontSize: 36, color: '#E50914', mb: 2 }} />
              <Typography sx={{ fontWeight: 500, mb: .5 }}>No analyses yet</Typography>
              <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300, mb: 3 }}>Upload a dataset to get started</Typography>
              <Button component={Link} to="/dashboard" sx={{ background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25' } }}>Get Started</Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {analyses.map(a => (
              <Grid item xs={12} md={6} key={a.id}>
                <Card sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', transition: 'all .25s ease', '&:hover': { border: '1px solid rgba(229,9,20,.15)', transform: 'translateY(-2px)' } }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Chip icon={<History sx={{ fontSize: 12 }} />} label={new Date(a.created_at).toLocaleDateString()} size="small" sx={{ mb: 1.5, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', color: '#9ca3af', fontSize: '.72rem' }} />
                    <Typography sx={{ fontWeight: 400, fontSize: '.9rem', mb: .5 }} noWrap>{a.prompt}</Typography>
                    <Typography sx={{ color: '#6b7280', fontSize: '.75rem', fontWeight: 300 }}>Dataset: {a.dataset_id.slice(0, 8)}...</Typography>
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
