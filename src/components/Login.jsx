import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Divider, InputAdornment, IconButton, Alert, Link, Container, Fade } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [fd, setFd] = useState({ email: '', password: '', show: false });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, msg: '' });

  const set = (f) => (e) => { setFd(p => ({ ...p, [f]: e.target.value })); if (err[f]) setErr(p => ({ ...p, [f]: '' })); };
  const validate = () => {
    const e = {};
    if (!fd.email.trim()) e.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = 'Invalid email';
    if (!fd.password.trim()) e.password = 'Required'; else if (fd.password.length < 6) e.password = 'Min 6 chars';
    setErr(e); return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault(); if (!validate()) return; setLoading(true);
    try { await login(fd.email, fd.password); nav('/dashboard', { replace: true }); }
    catch (e) { setAlert({ open: true, msg: e.response?.data?.detail || 'Invalid credentials' }); }
    finally { setLoading(false); }
  };

  const ic = { color: '#6C3AFF', fontSize: 20 };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, background: '#fafbfc' }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#6C3AFF', mb: 1 }}>AnalytIQ</Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>AI-Powered Data Analytics</Typography>
        </Box>
        <Fade in timeout={500}>
          <Card sx={{ maxWidth: 440, mx: 'auto', border: '1px solid #f1f5f9' }}>
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: .5 }}>Welcome back</Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>Sign in to your account</Typography>
              </Box>
              <form onSubmit={submit}>
                <TextField label="Email" type="email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} disabled={loading} sx={{ mb: 2.5 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={ic} /></InputAdornment> }} />
                <TextField label="Password" type={fd.show ? 'text' : 'password'} fullWidth value={fd.password} onChange={set('password')} error={!!err.password} helperText={err.password} disabled={loading} sx={{ mb: 3 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={ic} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setFd(p => ({ ...p, show: !p.show }))}>{fd.show ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}</IconButton></InputAdornment> }} />
                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={!loading && <ArrowForward />} sx={{ py: 1.5, fontSize: '.95rem' }}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              {alert.open && <Alert severity="error" sx={{ mt: 2 }} onClose={() => setAlert({ open: false, msg: '' })}>{alert.msg}</Alert>}
              <Divider sx={{ my: 3 }} />
              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: '#64748b' }}>Don't have an account?{' '}<Link component={RouterLink} to="/signup" sx={{ color: '#6C3AFF', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link></Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};
export default Login;
