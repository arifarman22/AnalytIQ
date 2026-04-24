import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();
export const useThemeMode = () => useContext(ThemeContext);

const getDesign = (mode) => ({
  palette: {
    mode,
    primary: { main: '#6C3AFF', dark: '#5529cc', light: '#a78bfa' },
    secondary: { main: '#a855f7' },
    background: {
      default: mode === 'dark' ? '#0B0F1A' : '#ffffff',
      paper: mode === 'dark' ? '#111827' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
    },
    divider: mode === 'dark' ? '#1e293b' : '#e2e8f0',
    success: { main: '#16a34a' },
    error: { main: '#dc2626' },
    warning: { main: '#f59e0b' },
    custom: {
      bg: mode === 'dark' ? '#0B0F1A' : '#ffffff',
      bgSoft: mode === 'dark' ? '#111827' : '#f8f9fb',
      bgMuted: mode === 'dark' ? '#1e293b' : '#f1f5f9',
      border: mode === 'dark' ? '#1e293b' : '#e2e8f0',
      borderLight: mode === 'dark' ? '#374151' : '#f1f5f9',
      card: mode === 'dark' ? '#111827' : '#ffffff',
      cardHover: mode === 'dark' ? '#1a2332' : '#faf5ff',
      accentLight: mode === 'dark' ? 'rgba(108,58,255,.15)' : '#ede9fe',
      glow: mode === 'dark' ? 'rgba(108,58,255,.2)' : 'rgba(108,58,255,.06)',
      shadow: mode === 'dark' ? '0 1px 3px rgba(0,0,0,.3),0 4px 24px rgba(0,0,0,.2)' : '0 1px 3px rgba(0,0,0,.04),0 4px 24px rgba(0,0,0,.06)',
      shadowHover: mode === 'dark' ? '0 8px 40px rgba(108,58,255,.2)' : '0 8px 40px rgba(108,58,255,.1)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { fontWeight: 500, textTransform: 'none' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#0B0F1A' : '#fff',
          transition: 'background-color .3s ease, color .3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#111827' : '#fff',
          boxShadow: mode === 'dark' ? '0 1px 3px rgba(0,0,0,.3),0 4px 24px rgba(0,0,0,.2)' : '0 1px 3px rgba(0,0,0,.04),0 4px 24px rgba(0,0,0,.06)',
          border: `1px solid ${mode === 'dark' ? '#1e293b' : '#f1f5f9'}`,
          transition: 'all .3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 50, textTransform: 'none', fontWeight: 500, padding: '10px 24px' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#111827' : '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': { borderColor: mode === 'dark' ? '#374151' : '#e2e8f0' },
            '&:hover fieldset': { borderColor: '#a78bfa' },
            '&.Mui-focused fieldset': { borderColor: '#6C3AFF' },
          },
          '& .MuiInputLabel-root': { color: mode === 'dark' ? '#94a3b8' : '#64748b' },
          '& .MuiOutlinedInput-input': { color: mode === 'dark' ? '#f1f5f9' : '#0f172a' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(11,15,26,.9)' : 'rgba(255,255,255,.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${mode === 'dark' ? '#1e293b' : '#e2e8f0'}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: mode === 'dark' ? '#111827' : '#fff' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: mode === 'dark' ? '#1e293b' : '#fff' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#111827' : '#fff',
          boxShadow: 'none',
          '&:before': { display: 'none' },
        },
      },
    },
  },
});

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggle = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme(getDesign(mode)), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
