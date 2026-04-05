import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent, Grid, Chip, Button, CircularProgress, Alert
} from '@mui/material';
import { History, Analytics, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/analyses/')
      .then(res => setAnalyses(res.data))
      .catch(err => setError(err.response?.data?.detail || 'Failed to load history'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} gutterBottom>Analysis History</Typography>
          <Typography variant="body1" color="text.secondary">{analyses.length} analyses completed</Typography>
        </Box>
        <Button component={Link} to="/dashboard" variant="contained" endIcon={<ArrowForward />}>
          New Analysis
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {analyses.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Analytics sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>No analyses yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Upload a dataset and run your first analysis</Typography>
            <Button component={Link} to="/dashboard" variant="contained">Get Started</Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {analyses.map((a) => (
            <Grid item xs={12} md={6} key={a.id}>
              <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip icon={<History />} label={new Date(a.created_at).toLocaleDateString()} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }} noWrap>{a.prompt}</Typography>
                  <Typography variant="caption" color="text.secondary">Dataset: {a.dataset_id.slice(0, 8)}...</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AnalysisHistory;
