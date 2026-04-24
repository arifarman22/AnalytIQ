import React from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, TextField, Button, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GitHub, LinkedIn, Twitter, Email, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const links = {
  Product: [{ l: 'Dashboard', to: '/dashboard' }, { l: 'Pricing', to: '/pricing' }, { l: 'History', to: '/history' }, { l: 'API Docs', to: '#' }],
  Company: [{ l: 'About', to: '#' }, { l: 'Blog', to: '#' }, { l: 'Careers', to: '#' }, { l: 'Contact', to: '/contact' }],
  Resources: [{ l: 'Documentation', to: '#' }, { l: 'Tutorials', to: '#' }, { l: 'Community', to: '#' }, { l: 'Status', to: '#' }],
  Legal: [{ l: 'Privacy', to: '#' }, { l: 'Terms', to: '#' }, { l: 'Cookies', to: '#' }, { l: 'Security', to: '#' }],
};

const Footer = () => {
  const t = useTheme();
  const dark = t.palette.mode === 'dark';
  const c = t.palette.custom;
  return (
    <Box component="footer" sx={{ width: '100%', borderTop: `1px solid ${dark ? 'rgba(255,255,255,.05)' : '#f1f5f9'}`, pt: { xs: 6, md: 8 }, pb: 4, background: dark ? 'rgba(0,0,0,.2)' : '#fafbfc', transition: 'all .3s ease' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', mb: 2 }}>AnalytIQ</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, maxWidth: 280, lineHeight: 1.7 }}>
              AI-powered data analytics platform. Transform complex datasets into actionable intelligence.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}>Stay updated</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField size="small" placeholder="your@email.com" variant="outlined" sx={{ flex: 1, '& .MuiOutlinedInput-root': { fontSize: '.85rem', height: 40, borderRadius: '50px !important' } }} />
              <Button variant="contained" size="small" sx={{ minWidth: 40, px: 1.5, height: 40, borderRadius: '50px', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)' }}><ArrowForward sx={{ fontSize: 18 }} /></Button>
            </Box>
          </Grid>
          {Object.entries(links).map(([title, items]) => (
            <Grid item xs={6} sm={3} md={2} key={title}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, display: 'block', mb: 2 }}>{title}</Typography>
              <Stack spacing={1.2}>
                {items.map(lnk => (
                  <Typography key={lnk.l} component={Link} to={lnk.to} variant="body2" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '.85rem', transition: 'color .2s', '&:hover': { color: '#a78bfa' } }}>{lnk.l}</Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4, borderColor: dark ? 'rgba(255,255,255,.05)' : '#f1f5f9' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>© {new Date().getFullYear()} AnalytIQ. All rights reserved.</Typography>
          <Stack direction="row" spacing={.5}>
            {[<Twitter />, <LinkedIn />, <GitHub />, <Email />].map((ic, i) => (
              <IconButton key={i} size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#a78bfa', background: dark ? 'rgba(108,58,255,.1)' : '#ede9fe' } }}>{React.cloneElement(ic, { sx: { fontSize: 18 } })}</IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
