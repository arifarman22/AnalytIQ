import React from 'react';
import { Box, Typography } from '@mui/material';

const SplashScreen = ({ visible }) => (
  <Box
    sx={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity .6s ease-out',
    }}
  >
    {/* Glow */}
    <Box sx={{
      position: 'absolute', width: 400, height: 400,
      background: 'radial-gradient(circle, rgba(108,58,255,.25) 0%, transparent 70%)',
      borderRadius: '50%', filter: 'blur(60px)',
    }} />

    {/* Logo */}
    <Typography sx={{
      fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 900, letterSpacing: '-0.03em',
      background: 'linear-gradient(135deg, #6C3AFF, #a855f7, #6C3AFF)',
      backgroundSize: '200% 200%',
      backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      animation: 'shimmer 2s ease-in-out infinite',
      position: 'relative', zIndex: 1,
    }}>
      AnalytIQ
    </Typography>

    {/* Tagline */}
    <Typography sx={{
      color: 'rgba(255,255,255,.5)', fontSize: { xs: '.85rem', md: '1rem' },
      fontWeight: 400, mt: 1.5, letterSpacing: '.05em', position: 'relative', zIndex: 1,
    }}>
      AI-Powered Data Analytics
    </Typography>

    {/* Loading bar */}
    <Box sx={{
      width: 120, height: 3, borderRadius: 2, mt: 4, overflow: 'hidden',
      background: 'rgba(255,255,255,.1)', position: 'relative', zIndex: 1,
    }}>
      <Box sx={{
        width: '40%', height: '100%', borderRadius: 2,
        background: 'linear-gradient(90deg, #6C3AFF, #a855f7)',
        animation: 'loadbar 1.2s ease-in-out infinite',
      }} />
    </Box>
  </Box>
);

export default SplashScreen;
