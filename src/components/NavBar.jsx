import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar, Chip, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ExitToApp, Settings, DarkMode, LightMode } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';

const NavBar = ({ user, onLogout }) => {
  const theme = useTheme();
  const { mode, toggle } = useThemeMode();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const loc = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const c = theme.palette.custom;

  const nav = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    ...(user ? [{ label: 'History', path: '/history' }] : []),
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];
  const profileMenu = [
    { label: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { label: 'Settings', path: '/settings', icon: <Settings /> },
    { label: 'Logout', action: () => { setAnchorEl(null); onLogout(); }, icon: <ExitToApp /> },
  ];

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: { xs: 64, md: 70 }, maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        {mobile ? (
          <>
            <IconButton edge="start" onClick={() => setDrawer(true)} sx={{ mr: 1, color: 'text.primary' }}><MenuIcon /></IconButton>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', flexGrow: 1 }}>AnalytIQ</Typography>
            <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={toggle} sx={{ color: 'text.secondary' }}>{mode === 'dark' ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}</IconButton>
            </Tooltip>
            <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)} PaperProps={{ sx: { width: 280 } }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Menu</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>{nav.map(n => (
                  <ListItem key={n.label} button component={Link} to={n.path} onClick={() => setDrawer(false)} selected={loc.pathname === n.path} sx={{ borderRadius: 2, mb: .5, '&.Mui-selected': { background: c.accentLight, color: '#6C3AFF' } }}>
                    <ListItemText primary={n.label} />
                  </ListItem>
                ))}</List>
                <Divider sx={{ my: 2 }} />
                {user ? (
                  <List>{profileMenu.map(p => (
                    <ListItem key={p.label} button component={p.path ? Link : 'li'} to={p.path} onClick={p.action || (() => setDrawer(false))} sx={{ borderRadius: 2, mb: .5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>{p.icon}</ListItemIcon>
                      <ListItemText primary={p.label} />
                    </ListItem>
                  ))}</List>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button component={Link} to="/login" variant="outlined" fullWidth onClick={() => setDrawer(false)}>Sign In</Button>
                    <Button component={Link} to="/signup" variant="contained" fullWidth onClick={() => setDrawer(false)}>Get Started</Button>
                  </Box>
                )}
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mr: 5, letterSpacing: '-0.02em' }}>AnalytIQ</Typography>
              <Box sx={{ display: 'flex', gap: .5 }}>
                {nav.map(n => (
                  <Button key={n.label} component={Link} to={n.path} sx={{
                    px: 2, color: loc.pathname === n.path ? '#6C3AFF' : 'text.secondary', fontWeight: loc.pathname === n.path ? 600 : 400,
                    fontSize: '.9rem', borderRadius: 50, background: loc.pathname === n.path ? c.accentLight : 'transparent',
                    '&:hover': { background: c.bgSoft, color: 'text.primary' }, transition: 'all .25s ease',
                  }}>{n.label}</Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
                <IconButton onClick={toggle} sx={{ color: 'text.secondary', transition: 'all .3s ease', '&:hover': { color: '#6C3AFF', background: c.accentLight } }}>
                  {mode === 'dark' ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>
              {user ? (
                <>
                  <Chip
                    avatar={<Avatar sx={{ width: 28, height: 28, fontSize: '.8rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff' }}>{(user.name?.[0] || user.email?.[0])?.toUpperCase()}</Avatar>}
                    label={user.name || user.email} variant="outlined"
                    onClick={e => setAnchorEl(e.currentTarget)}
                    sx={{ borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }}
                  />
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1.5, minWidth: 200, borderRadius: 3, border: `1px solid ${c.border}`, boxShadow: c.shadowHover } }}>
                    {profileMenu.map(p => (
                      <MenuItem key={p.label} onClick={p.action || (() => setAnchorEl(null))} component={p.path ? Link : 'li'} to={p.path} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ color: 'text.secondary', minWidth: 36 }}>{p.icon}</ListItemIcon>
                        <ListItemText>{p.label}</ListItemText>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" variant="outlined" sx={{ px: 3, borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }}>Sign In</Button>
                  <Button component={Link} to="/signup" variant="contained" sx={{ px: 3, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)', '&:hover': { boxShadow: '0 6px 24px rgba(108,58,255,.35)' } }}>Get Started</Button>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
