import React from 'react';
import { Box, Typography } from '@mui/material';

const SplashScreen = ({ visible }) => (
  <Box sx={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0B0B0B', opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none', transition: 'opacity .5s ease-out' }}>
    <Box sx={{ position: 'absolute', width: 300, height: 300, background: 'radial-gradient(circle, rgba(229,9,20,.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
    <Typography sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: '#EAEAEA', position: 'relative', zIndex: 1 }}>
      Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box>
    </Typography>
    <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300, mt: 1, position: 'relative', zIndex: 1 }}>AI-Powered Analytics</Typography>
    <Box sx={{ width: 80, height: 2, borderRadius: 1, mt: 3, overflow: 'hidden', background: 'rgba(255,255,255,.05)', position: 'relative', zIndex: 1 }}>
      <Box sx={{ width: '40%', height: '100%', background: '#E50914', animation: 'loadbar 1s ease-in-out infinite' }} />
    </Box>
  </Box>
);
export default SplashScreen;
