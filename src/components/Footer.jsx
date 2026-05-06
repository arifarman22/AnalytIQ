import React from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, Divider } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Email } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const links = {
  Product: [{ l: 'Dashboard', to: '/dashboard' }, { l: 'Pricing', to: '/pricing' }, { l: 'History', to: '/history' }],
  Company: [{ l: 'About', to: '#' }, { l: 'Contact', to: '/contact' }, { l: 'Careers', to: '#' }],
  Legal: [{ l: 'Privacy', to: '#' }, { l: 'Terms', to: '#' }, { l: 'Security', to: '#' }],
};

const Footer = () => (
  <Box component="footer" sx={{ width: '100%', borderTop: '1px solid rgba(255,255,255,.04)', pt: { xs: 5, md: 6 }, pb: 3, mt: 'auto' }}>
    <Container maxWidth="lg">
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 600, color: '#EAEAEA', display: 'inline-block', mb: 1.5, fontSize: '1.1rem' }}>
            Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box>
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300, maxWidth: 260, lineHeight: 1.7 }}>
            AI-powered data analytics. Transform datasets into intelligence.
          </Typography>
        </Grid>
        {Object.entries(links).map(([title, items]) => (
          <Grid item xs={4} sm={3} md={2} key={title}>
            <Typography sx={{ color: '#6b7280', fontWeight: 500, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: 1.5, mb: 1.5 }}>{title}</Typography>
            <Stack spacing={1}>
              {items.map(lnk => (
                <Typography key={lnk.l} component={Link} to={lnk.to} sx={{ color: '#9ca3af', textDecoration: 'none', fontSize: '.83rem', fontWeight: 300, transition: 'color .2s', '&:hover': { color: '#EAEAEA' } }}>{lnk.l}</Typography>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.04)' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography sx={{ color: '#4b5563', fontSize: '.78rem', fontWeight: 300 }}>© {new Date().getFullYear()} AnalytIQ</Typography>
        <Stack direction="row" spacing={.5}>
          {[<Twitter />, <LinkedIn />, <GitHub />, <Email />].map((ic, i) => (
            <IconButton key={i} size="small" sx={{ color: '#4b5563', '&:hover': { color: '#E50914' }, transition: 'color .2s' }}>{React.cloneElement(ic, { sx: { fontSize: 16 } })}</IconButton>
          ))}
        </Stack>
      </Box>
    </Container>
  </Box>
);
export default Footer;
