import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Divider, InputAdornment, IconButton, Alert, Link, Container, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const t = useTheme();
  const c = t.palette.custom;
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
    catch (e) { setAlert({ open: true, msg: e.safeMessage || e.response?.data?.detail || 'Invalid credentials' }); }
    finally { setLoading(false); }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, background: c.bgSoft, transition: 'background .3s ease' }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>AnalytIQ</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>AI-Powered Data Analytics</Typography>
        </Box>
        <Fade in timeout={500}>
          <Card sx={{ maxWidth: 440, mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: .5 }}>Welcome back</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Sign in to your account</Typography>
              </Box>
              <form onSubmit={submit}>
                <TextField label="Email" type="email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} disabled={loading} sx={{ mb: 2.5 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                <TextField label="Password" type={fd.show ? 'text' : 'password'} fullWidth value={fd.password} onChange={set('password')} error={!!err.password} helperText={err.password} disabled={loading} sx={{ mb: 3 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setFd(p => ({ ...p, show: !p.show }))}>{fd.show ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}</IconButton></InputAdornment> }} />
                <Button type="submit" fullWidth variant="contained" disabled={loading} endIcon={!loading && <ArrowForward />} sx={{ py: 1.5, fontSize: '.95rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)' }}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              {alert.open && <Alert severity="error" sx={{ mt: 2 }} onClose={() => setAlert({ open: false, msg: '' })}>{alert.msg}</Alert>}
              <Divider sx={{ my: 3 }} />
              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Don't have an account?{' '}<Link component={RouterLink} to="/signup" sx={{ color: '#6C3AFF', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link></Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};
export default Login;
