import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box,
  InputAdornment, IconButton, Alert, Link, Container, Fade, Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Business, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', company: '', showPassword: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password, formData.company);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.detail || 'Signup failed', severity: 'error' });
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
          <Typography variant="body2" color="text.secondary">Start your data journey</Typography>
        </Box>

        <Fade in timeout={800}>
          <Card sx={{ width: '100%', maxWidth: 480, mx: 'auto', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>Create Account</Typography>

              <form onSubmit={handleSubmit}>
                <TextField label="Full Name" fullWidth value={formData.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} sx={{ mb: 2 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Person color="primary" /></InputAdornment> }} />
                <TextField label="Email" type="email" fullWidth value={formData.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment> }} />
                <TextField label="Company (Optional)" fullWidth value={formData.company} onChange={handleChange('company')} sx={{ mb: 2 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Business color="primary" /></InputAdornment> }} />
                <TextField label="Password" type={formData.showPassword ? 'text' : 'password'} fullWidth value={formData.password} onChange={handleChange('password')} error={!!errors.password} helperText={errors.password} sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock color="primary" /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setFormData(p => ({ ...p, showPassword: !p.showPassword }))}>{formData.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>
                  }} />
                <TextField label="Confirm Password" type="password" fullWidth value={formData.confirmPassword} onChange={handleChange('confirmPassword')} error={!!errors.confirmPassword} helperText={errors.confirmPassword} sx={{ mb: 3 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="primary" /></InputAdornment> }} />

                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={!loading && <ArrowForward />}
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 600, fontSize: '1rem' }}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>

              <Alert severity={alert.severity} sx={{ mt: 2, display: alert.open ? 'flex' : 'none' }}
                onClose={() => setAlert(p => ({ ...p, open: false }))}>{alert.message}</Alert>

              <Divider sx={{ my: 3 }} />

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" color="primary" sx={{ textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Container>
  );
};

export default Signup;
