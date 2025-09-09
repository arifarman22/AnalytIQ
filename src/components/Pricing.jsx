import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Container } from '@mui/material';

const Pricing = () => (
  <Container maxWidth="lg">
    <Box mt={8} mb={6}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
        Pricing Plans
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
        Choose the plan that works best for your data analysis needs
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Free
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                Basic analysis features for getting started with data exploration
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                $0
                <Typography variant="body2" component="span" color="text.secondary">
                  /month
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            border: '2px solid',
            borderColor: 'primary.main'
          }}>
            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Pro
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                Advanced insights, visualizations, and priority support for professionals
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                $19
                <Typography variant="body2" component="span" color="text.secondary">
                  /month
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Pricing;