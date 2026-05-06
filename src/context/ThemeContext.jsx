import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();
export const useThemeMode = () => useContext(ThemeContext);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E50914', dark: '#b8070f', light: '#ff3d47' },
    secondary: { main: '#1F1F1F' },
    background: { default: '#0B0B0B', paper: '#141414' },
    text: { primary: '#EAEAEA', secondary: '#9ca3af' },
    divider: 'rgba(255,255,255,.06)',
    error: { main: '#E50914' },
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: { fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 500, letterSpacing: '-0.01em' },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 300 },
    body2: { fontWeight: 300 },
    button: { fontWeight: 500, textTransform: 'none' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: '#0B0B0B' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16, backgroundImage: 'none', backgroundColor: '#141414', border: '1px solid rgba(255,255,255,.05)', boxShadow: '0 2px 8px rgba(0,0,0,.3)' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, textTransform: 'none', fontWeight: 500, padding: '10px 24px', transition: 'all .25s ease' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: '#141414' } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 10, '& fieldset': { borderColor: 'rgba(255,255,255,.08)' }, '&:hover fieldset': { borderColor: 'rgba(255,255,255,.15)' }, '&.Mui-focused fieldset': { borderColor: '#E50914' } }, '& .MuiInputLabel-root': { color: '#9ca3af' }, '& .MuiOutlinedInput-input': { color: '#EAEAEA', fontWeight: 300 } } } },
    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: 'rgba(11,11,11,.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,.04)', boxShadow: 'none' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 400 } } },
    MuiAccordion: { styleOverrides: { root: { backgroundColor: '#141414', boxShadow: 'none', '&:before': { display: 'none' } } } },
    MuiDrawer: { styleOverrides: { paper: { backgroundColor: '#0B0B0B' } } },
    MuiMenu: { styleOverrides: { paper: { backgroundColor: '#1F1F1F', border: '1px solid rgba(255,255,255,.06)' } } },
  },
});

export const ThemeModeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ mode: 'dark', toggle: () => {} }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
