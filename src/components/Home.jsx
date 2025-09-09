import React from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Stack,
  alpha
} from '@mui/material';
import { 
  Analytics, 
  ShowChart, 
  AutoAwesome, 
  Security, 
  RocketLaunch,
  TrendingUp,
  Dashboard,
  IntegrationInstructions,
  ArrowForward
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced Analytics',
      description: 'Powerful statistical analysis and machine learning algorithms to uncover hidden patterns in your data.'
    },
    {
      icon: <ShowChart sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Interactive Visualizations',
      description: 'Create stunning, interactive charts and dashboards that make complex data easy to understand.'
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Insights',
      description: 'Leverage cutting-edge AI to generate actionable insights and predictive analytics from your datasets.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance with industry standards.'
    },
    {
      icon: <Dashboard sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Dashboards',
      description: 'Monitor your data in real-time with customizable dashboards and automated reporting.'
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Seamless Integration',
      description: 'Connect with your existing tools and workflows through our comprehensive API and integrations.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support' },
    { number: '1M+', label: 'Analyses Completed' }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#7c4dff', 0.1)} 0%, ${alpha('#651fff', 0.1)} 100%)`,
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Chip
              label="Enterprise Grade Analytics"
              color="primary"
              variant="filled"
              sx={{ mb: 3, px: 2, py: 1, fontSize: '0.9rem' }}
            />
            
            <Typography 
              variant="h1" 
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: 'linear-gradient(45deg, #7c4dff, #651fff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Transform Data Into Competitive Advantage
            </Typography>
            
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto', 
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              AnalytIQ empowers businesses with AI-driven insights, advanced visualizations, and actionable intelligence from complex datasets.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}
              >
                Start Analyzing
              </Button>
              <Button
                component={Link}
                to="/pricing"
                variant="outlined"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}
              >
                View Pricing
              </Button>
            </Stack>

            {/* Stats Section */}
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 8 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box textAlign="center">
                    <Typography variant="h3" fontWeight={700} color="primary.main">
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
            Why Choose AnalytIQ?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Built for data professionals, trusted by enterprises worldwide
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#7c4dff', 0.9)} 0%, ${alpha('#651fff', 0.9)} 100%)`,
          py: { xs: 8, md: 12 },
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <RocketLaunch sx={{ fontSize: 60, mb: 3 }} />
            <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
              Ready to Transform Your Data?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of data-driven companies making smarter decisions with AnalytIQ
            </Typography>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 1.5,
                px: 6,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
                background: 'white',
                color: 'primary.main',
                '&:hover': {
                  background: alpha('#fff', 0.9)
                }
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Trusted By Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            TRUSTED BY INDUSTRY LEADERS
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {['Fortune 500', 'Tech Startups', 'Financial Institutions', 'Healthcare', 'E-commerce', 'Research'].map((industry, index) => (
              <Grid item key={index}>
                <Chip
                  label={industry}
                  variant="outlined"
                  sx={{ 
                    px: 2,
                    borderColor: 'primary.main',
                    color: 'text.primary'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;