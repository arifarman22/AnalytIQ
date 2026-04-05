import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box,
  Divider, InputAdornment, IconButton, Alert, Link, Container, Fade
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', showPassword: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.detail || 'Invalid email or password', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 8 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #7c4dff, #651fff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
            AnalytIQ
          </Typography>
          <Typography variant="body2" color="text.secondary">AI-Powered Data Analytics Platform</Typography>
        </Box>

        <Fade in timeout={800}>
          <Card sx={{ width: '100%', maxWidth: 450, mx: 'auto', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>Welcome Back</Typography>
                <Typography variant="body2" color="text.secondary">Sign in to your account</Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField label="Email" type="email" fullWidth value={formData.email} onChange={handleChange('email')}
                  error={!!errors.email} helperText={errors.email} disabled={loading} sx={{ mb: 2 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment> }} />

                <TextField label="Password" type={formData.showPassword ? 'text' : 'password'} fullWidth
                  value={formData.password} onChange={handleChange('password')}
                  error={!!errors.password} helperText={errors.password} disabled={loading} sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock color="primary" /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setFormData(p => ({ ...p, showPassword: !p.showPassword }))}>{formData.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                  }} />

                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={!loading && <ArrowForward />}
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 600, fontSize: '1rem' }}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <Alert severity={alert.severity} sx={{ mt: 2, display: alert.open ? 'flex' : 'none' }}
                onClose={() => setAlert(p => ({ ...p, open: false }))}>{alert.message}</Alert>

              <Divider sx={{ my: 3 }} />

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/signup" color="primary" sx={{ textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Container>
  );
};

export default Login;
