import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Card, CardContent, Container, Grid, Alert, Snackbar, InputAdornment, CircularProgress, Stack } from '@mui/material';
import { Email, Person, Message, Phone, Business, ArrowForward } from '@mui/icons-material';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => { const [r, v] = useScrollReveal(.08); return <div ref={r} className={`reveal ${v ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>; };

const Contact = () => {
  const [fd, setFd] = useState({ name: '', email: '', subject: '', message: '' });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' });

  const set = (f) => (e) => { setFd(p => ({ ...p, [f]: e.target.value })); if (err[f]) setErr(p => ({ ...p, [f]: '' })); };
  const validate = () => {
    const e = {};
    if (!fd.name.trim()) e.name = 'Required';
    if (!fd.email.trim()) e.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = 'Invalid';
    if (!fd.message.trim()) e.message = 'Required';
    setErr(e); return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault(); if (!validate()) return; setLoading(true);
    try { await new Promise(r => setTimeout(r, 1500)); setSnack({ open: true, msg: 'Message sent!', sev: 'success' }); setFd({ name: '', email: '', subject: '', message: '' }); }
    catch { setSnack({ open: true, msg: 'Failed. Try again.', sev: 'error' }); }
    finally { setLoading(false); }
  };

  const contactInfo = [
    { icon: '📞', label: 'Phone', value: '01857-055057', href: 'tel:+8801857055057' },
    { icon: '💬', label: 'WhatsApp', value: '01857-055057', href: 'https://wa.me/8801857055057' },
    { icon: '✉️', label: 'Email', value: 'arifarman7862@gmail.com', href: 'mailto:arifarman7862@gmail.com' },
  ];

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ width: '100%', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Reveal>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1.5 }}>Get in touch</Typography>
            <Typography sx={{ color: '#9ca3af', fontWeight: 300 }}>Have a question or want to work together?</Typography>
          </Reveal>
        </Container>
      </Box>

      {/* Contact Cards */}
      <Container maxWidth="md">
        <Reveal>
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {contactInfo.map((c, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Card
                  component="a" href={c.href} target={c.label === 'WhatsApp' ? '_blank' : undefined}
                  sx={{ textDecoration: 'none', display: 'block', textAlign: 'center', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', cursor: 'pointer', transition: 'all .3s ease', '&:hover': { border: '1px solid rgba(229,9,20,.2)', transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,.3)' } }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ fontSize: '1.5rem', mb: 1 }}>{c.icon}</Box>
                    <Typography sx={{ fontWeight: 500, fontSize: '.85rem', mb: .5 }}>{c.label}</Typography>
                    <Typography sx={{ color: '#9ca3af', fontSize: '.8rem', fontWeight: 300 }}>{c.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Reveal>

        {/* Form */}
        <Reveal delay={1}>
          <Card sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', maxWidth: 560, mx: 'auto', mb: 8 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <form onSubmit={submit}>
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Name" fullWidth value={fd.name} onChange={set('name')} error={!!err.name} helperText={err.name} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                    </Grid>
                  </Grid>
                  <TextField label="Subject" fullWidth value={fd.subject} onChange={set('subject')} InputProps={{ startAdornment: <InputAdornment position="start"><Message sx={{ color: '#6b7280', fontSize: 18 }} /></InputAdornment> }} />
                  <TextField label="Message" multiline rows={4} fullWidth value={fd.message} onChange={set('message')} error={!!err.message} helperText={err.message} />
                  <Button type="submit" fullWidth disabled={loading} endIcon={loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <ArrowForward sx={{ fontSize: 18 }} />}
                    sx={{ py: 1.4, background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25' }, '&:disabled': { background: '#333', color: '#666' } }}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </Container>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnack(p => ({ ...p, open: false }))} severity={snack.sev} sx={{ borderRadius: 3 }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
};
export default Contact;
