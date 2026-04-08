import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, InputAdornment, IconButton, Alert, Link, Container, Fade, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Business, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const nav = useNavigate();
  const { signup } = useAuth();
  const [fd, setFd] = useState({ name: '', email: '', password: '', confirmPassword: '', company: '', show: false });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, msg: '' });

  const set = (f) => (e) => { setFd(p => ({ ...p, [f]: e.target.value })); if (err[f]) setErr(p => ({ ...p, [f]: '' })); };
  const validate = () => {
    const e = {};
    if (!fd.name.trim()) e.name = 'Required';
    if (!fd.email.trim()) e.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = 'Invalid';
    if (!fd.password.trim()) e.password = 'Required'; else if (fd.password.length < 6) e.password = 'Min 6 chars';
    if (fd.password !== fd.confirmPassword) e.confirmPassword = 'Mismatch';
    setErr(e); return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault(); if (!validate()) return; setLoading(true);
    try { await signup(fd.name, fd.email, fd.password, fd.company); nav('/dashboard', { replace: true }); }
    catch (e) { setAlert({ open: true, msg: e.response?.data?.detail || 'Signup failed' }); }
    finally { setLoading(false); }
  };
  const ic = { color: '#6C3AFF', fontSize: 20 };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, background: '#fafbfc' }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#6C3AFF', mb: 1 }}>AnalytIQ</Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>Start your data journey</Typography>
        </Box>
        <Fade in timeout={500}>
          <Card sx={{ maxWidth: 480, mx: 'auto', border: '1px solid #f1f5f9' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>Create account</Typography>
              <form onSubmit={submit}>
                <TextField label="Full Name" fullWidth value={fd.name} onChange={set('name')} error={!!err.name} helperText={err.name} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={ic} /></InputAdornment> }} />
                <TextField label="Email" type="email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={ic} /></InputAdornment> }} />
                <TextField label="Company (Optional)" fullWidth value={fd.company} onChange={set('company')} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Business sx={ic} /></InputAdornment> }} />
                <TextField label="Password" type={fd.show ? 'text' : 'password'} fullWidth value={fd.password} onChange={set('password')} error={!!err.password} helperText={err.password} sx={{ mb: 2 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={ic} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setFd(p => ({ ...p, show: !p.show }))}>{fd.show ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}</IconButton></InputAdornment> }} />
                <TextField label="Confirm Password" type="password" fullWidth value={fd.confirmPassword} onChange={set('confirmPassword')} error={!!err.confirmPassword} helperText={err.confirmPassword} sx={{ mb: 3 }} InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={ic} /></InputAdornment> }} />
                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={!loading && <ArrowForward />} sx={{ py: 1.5, fontSize: '.95rem' }}>{loading ? 'Creating...' : 'Sign Up'}</Button>
              </form>
              {alert.open && <Alert severity="error" sx={{ mt: 2 }} onClose={() => setAlert({ open: false, msg: '' })}>{alert.msg}</Alert>}
              <Divider sx={{ my: 3 }} />
              <Box textAlign="center"><Typography variant="body2" sx={{ color: '#64748b' }}>Already have an account?{' '}<Link component={RouterLink} to="/login" sx={{ color: '#6C3AFF', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link></Typography></Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};
export default Signup;
