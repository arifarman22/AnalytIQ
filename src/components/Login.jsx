import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  Container,
  Fade
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Google,
  Facebook,
  Email,
  Lock,
  ArrowForward
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClickShowPassword = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with real authentication
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        onLogin({ 
          email: formData.email,
          name: 'Demo User',
          avatar: null
        });
        navigate('/dashboard', { replace: true });
      } else {
        setAlert({
          open: true,
          message: 'Invalid credentials. Use user@example.com / password',
          severity: 'error'
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Login failed. Please try again later.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setAlert({
      open: true,
      message: `${provider} authentication would be integrated here`,
      severity: 'info'
    });
  };

  const handleCloseAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
          px: 2
        }}
      >
        {/* Logo/Brand */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #7c4dff, #651fff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            AnalytIQ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI-Powered Data Analytics Platform
          </Typography>
        </Box>

        <Fade in={true} timeout={800}>
          <Card 
            sx={{ 
              width: '100%', 
              maxWidth: 450,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to your AnalytIQ account
                </Typography>
              </Box>

              {/* Social Login Buttons */}
              <Box sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => handleSocialLogin('Google')}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  Continue with Google
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => handleSocialLogin('Facebook')}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  Continue with Facebook
                </Button>
              </Box>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Password"
                  type={formData.showPassword ? 'text' : 'password'}
                  fullWidth
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          disabled={loading}
                        >
                          {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />

                <Box textAlign="right" sx={{ mb: 3 }}>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    color="primary"
                    sx={{ textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  endIcon={!loading && <ArrowForward />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Demo credentials:</strong><br />
                  Email: user@example.com<br />
                  Password: password
                </Typography>
              </Box>

              {/* Sign Up Link */}
              <Box textAlign="center" sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    color="primary"
                    sx={{ textDecoration: 'none', fontWeight: 600 }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Alert for messages */}
        <Alert
          severity={alert.severity}
          sx={{ 
            mt: 2, 
            width: '100%', 
            maxWidth: 450,
            display: alert.open ? 'flex' : 'none'
          }}
          onClose={handleCloseAlert}
        >
          {alert.message}
        </Alert>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2024 AnalytIQ. All rights reserved. |{' '}
            <Link href="#" color="text.secondary" sx={{ textDecoration: 'none' }}>
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="#" color="text.secondary" sx={{ textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;