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
    if (!fd.email.trim()) e.email = 'Required';
    if (!fd.password.trim()) e.password = 'Required'; else if (fd.password.length < 8) e.password = 'Min 8 chars';
    if (fd.password !== fd.confirmPassword) e.confirmPassword = 'Mismatch';
    setErr(e); return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault(); if (!validate()) return; setLoading(true);
    try { await signup(fd.name, fd.email, fd.password, fd.company); nav('/dashboard', { replace: true }); }
    catch (e) { setAlert({ open: true, msg: e.safeMessage || 'Signup failed' }); }
    finally { setLoading(false); }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, width: '100%' }}>
      <Container maxWidth="sm">
        <Fade in timeout={400}>
          <Card sx={{ maxWidth: 460, mx: 'auto', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mb: .5 }}>Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box></Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300 }}>Create your account</Typography>
              </Box>
              <form onSubmit={submit}>
                <TextField label="Full Name" fullWidth value={fd.name} onChange={set('name')} error={!!err.name} helperText={err.name} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                <TextField label="Email" type="email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                <TextField label="Company (Optional)" fullWidth value={fd.company} onChange={set('company')} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Business sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                <TextField label="Password" type={fd.show ? 'text' : 'password'} fullWidth value={fd.password} onChange={set('password')} error={!!err.password} helperText={err.password} sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setFd(p => ({ ...p, show: !p.show }))} sx={{ color: '#6b7280' }}>{fd.show ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}</IconButton></InputAdornment> }} />
                <TextField label="Confirm Password" type="password" fullWidth value={fd.confirmPassword} onChange={set('confirmPassword')} error={!!err.confirmPassword} helperText={err.confirmPassword} sx={{ mb: 3 }} InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                <Button type="submit" fullWidth disabled={loading} endIcon={!loading && <ArrowForward sx={{ fontSize: 18 }} />} sx={{ py: 1.4, background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25' }, '&:disabled': { background: '#333', color: '#666' } }}>{loading ? 'Creating...' : 'Sign Up'}</Button>
              </form>
              {alert.open && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }} onClose={() => setAlert({ open: false, msg: '' })}>{alert.msg}</Alert>}
              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.04)' }} />
              <Box textAlign="center"><Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300 }}>Have an account? <Link component={RouterLink} to="/login" sx={{ color: '#E50914', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link></Typography></Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};
export default Signup;
