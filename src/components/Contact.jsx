import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Card, CardContent, Container, Grid, Alert, Snackbar, InputAdornment, CircularProgress, Chip, Stack } from '@mui/material';
import { Email, Person, Message, Send, Phone, Business, AccessTime, LocationOn, ArrowForward } from '@mui/icons-material';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => { const [r, v] = useScrollReveal(.12); return <div ref={r} className={`reveal ${v ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>; };

const Contact = () => {
  const [fd, setFd] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' });

  const set = (f) => (e) => { setFd(p => ({ ...p, [f]: e.target.value })); if (err[f]) setErr(p => ({ ...p, [f]: '' })); };
  const validate = () => {
    const e = {};
    if (!fd.name.trim()) e.name = 'Required';
    if (!fd.email.trim()) e.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) e.email = 'Invalid email';
    if (!fd.message.trim()) e.message = 'Required';
    setErr(e); return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault(); if (!validate()) return; setLoading(true);
    try { await new Promise(r => setTimeout(r, 1500)); setSnack({ open: true, msg: 'Message sent! We\'ll get back to you within 24 hours.', sev: 'success' }); setFd({ name: '', email: '', phone: '', company: '', subject: '', message: '' }); }
    catch { setSnack({ open: true, msg: 'Something went wrong. Please try again.', sev: 'error' }); }
    finally { setLoading(false); }
  };

  const contactCards = [
    { icon: <Email sx={{ fontSize: 24 }} />, title: 'Email Us', detail: 'support@analytiq.com', sub: 'We reply within 24 hours' },
    { icon: <Phone sx={{ fontSize: 24 }} />, title: 'Call Us', detail: '+1 (555) 123-4567', sub: 'Mon–Fri, 9am–6pm PST' },
    { icon: <LocationOn sx={{ fontSize: 24 }} />, title: 'Visit Us', detail: '123 Data Street', sub: 'San Francisco, CA 94103' },
  ];

  return (
    <Box sx={{ minHeight: 'calc(100vh - 70px)' }}>

      {/* Hero Header */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 5, md: 8 }, textAlign: 'center', background: '#fafbfc', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="sm">
          <Reveal>
            <Chip label="Contact" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, mb: 2 }}>
              Let's start a conversation
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.7 }}>
              Have a question, feedback, or want to learn more about AnalytIQ? We'd love to hear from you.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="md" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={2.5}>
          {contactCards.map((c, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Reveal delay={i + 1}>
                <Card sx={{ textAlign: 'center', border: '1px solid #f1f5f9', transition: 'all .3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(108,58,255,.08)' } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ede9fe', color: '#6C3AFF', mx: 'auto', mb: 2 }}>
                      {c.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: .5 }}>{c.title}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#0f172a', mb: .5 }}>{c.detail}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>{c.sub}</Typography>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Form Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Send us a message</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Fill out the form below and we'll get back to you shortly.</Typography>
            </Box>
          </Reveal>
          <Reveal delay={1}>
            <Card sx={{ border: '1px solid #f1f5f9' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <form onSubmit={submit}>
                  <Stack spacing={2.5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Full Name" fullWidth value={fd.name} onChange={set('name')} error={!!err.name} helperText={err.name} required
                          InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Email" type="email" fullWidth value={fd.email} onChange={set('email')} error={!!err.email} helperText={err.email} required
                          InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Phone (Optional)" fullWidth value={fd.phone} onChange={set('phone')}
                          InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Company (Optional)" fullWidth value={fd.company} onChange={set('company')}
                          InputProps={{ startAdornment: <InputAdornment position="start"><Business sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                      </Grid>
                    </Grid>
                    <TextField label="Subject" fullWidth value={fd.subject} onChange={set('subject')}
                      InputProps={{ startAdornment: <InputAdornment position="start"><Message sx={{ color: '#6C3AFF', fontSize: 20 }} /></InputAdornment> }} />
                    <TextField label="Your Message" multiline rows={5} fullWidth value={fd.message} onChange={set('message')} error={!!err.message} helperText={err.message} required
                      placeholder="Tell us how we can help..." />
                    <Button type="submit" variant="contained" fullWidth disabled={loading} endIcon={loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <ArrowForward />}
                      sx={{ py: 1.5, fontSize: '.95rem' }}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          {/* Bottom note */}
          <Reveal delay={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3 }}>
              <AccessTime sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>Average response time: under 24 hours</Typography>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={5000} onClose={() => setSnack(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnack(p => ({ ...p, open: false }))} severity={snack.sev} sx={{ width: '100%' }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
};
export default Contact;
