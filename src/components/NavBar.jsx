import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar, Chip, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ExitToApp, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const loc = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawer, setDrawer] = useState(false);

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

  const isActive = (path) => loc.pathname === path;

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, minHeight: { xs: 60, md: 64 } }}>
        {mobile ? (
          <>
            <IconButton edge="start" onClick={() => setDrawer(true)} sx={{ color: '#EAEAEA' }}><MenuIcon /></IconButton>
            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 600, color: '#EAEAEA', flexGrow: 1, ml: 1, fontSize: '1.1rem' }}>
              Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box>
            </Typography>
            <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)} PaperProps={{ sx: { width: 260, pt: 2 } }}>
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 2, px: 1 }}>Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box></Typography>
              </Box>
              <List sx={{ px: 1 }}>{nav.map(n => (
                <ListItem key={n.label} button component={Link} to={n.path} onClick={() => setDrawer(false)} sx={{ borderRadius: 2, mb: .5, color: isActive(n.path) ? '#E50914' : '#9ca3af', '&:hover': { background: 'rgba(229,9,20,.05)' } }}>
                  <ListItemText primary={n.label} primaryTypographyProps={{ fontWeight: isActive(n.path) ? 500 : 400, fontSize: '.9rem' }} />
                </ListItem>
              ))}</List>
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,.05)' }} />
              {user ? (
                <List sx={{ px: 1 }}>{profileMenu.map(p => (
                  <ListItem key={p.label} button component={p.path ? Link : 'li'} to={p.path} onClick={p.action || (() => setDrawer(false))} sx={{ borderRadius: 2, mb: .5 }}>
                    <ListItemIcon sx={{ minWidth: 32, color: '#9ca3af' }}>{p.icon}</ListItemIcon>
                    <ListItemText primary={p.label} primaryTypographyProps={{ fontSize: '.9rem' }} />
                  </ListItem>
                ))}</List>
              ) : (
                <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button component={Link} to="/login" fullWidth onClick={() => setDrawer(false)} sx={{ color: '#EAEAEA', border: '1px solid rgba(255,255,255,.1)', borderRadius: 2 }}>Sign In</Button>
                  <Button component={Link} to="/signup" fullWidth onClick={() => setDrawer(false)} sx={{ background: '#E50914', color: '#fff', borderRadius: 2, '&:hover': { background: '#ff1a25' } }}>Get Started</Button>
                </Box>
              )}
            </Drawer>
          </>
        ) : (
          <>
            <Typography component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 600, color: '#EAEAEA', mr: 6, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>
              Analyt<Box component="span" sx={{ color: '#E50914' }}>IQ</Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: .5, flexGrow: 1 }}>
              {nav.map(n => (
                <Button key={n.label} component={Link} to={n.path} sx={{
                  px: 2, py: .75, color: isActive(n.path) ? '#EAEAEA' : '#9ca3af',
                  fontSize: '.85rem', fontWeight: isActive(n.path) ? 500 : 400, borderRadius: 2,
                  background: isActive(n.path) ? 'rgba(255,255,255,.04)' : 'transparent',
                  '&:hover': { background: 'rgba(255,255,255,.04)', color: '#EAEAEA' },
                  transition: 'all .2s ease',
                }}>{n.label}</Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {user ? (
                <>
                  <Chip
                    avatar={<Avatar sx={{ width: 26, height: 26, fontSize: '.75rem', background: '#E50914', color: '#fff' }}>{(user.name?.[0] || 'U').toUpperCase()}</Avatar>}
                    label={user.name || user.email} variant="outlined"
                    onClick={e => setAnchorEl(e.currentTarget)}
                    sx={{ borderColor: 'rgba(255,255,255,.08)', color: '#EAEAEA', fontSize: '.85rem', '&:hover': { borderColor: 'rgba(229,9,20,.3)', background: 'rgba(229,9,20,.04)' } }}
                  />
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 3 } }}>
                    {profileMenu.map(p => (
                      <MenuItem key={p.label} onClick={p.action || (() => setAnchorEl(null))} component={p.path ? Link : 'li'} to={p.path} sx={{ py: 1.2, fontSize: '.9rem' }}>
                        <ListItemIcon sx={{ color: '#9ca3af', minWidth: 32 }}>{p.icon}</ListItemIcon>
                        {p.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" sx={{ color: '#9ca3af', fontSize: '.85rem', '&:hover': { color: '#EAEAEA' } }}>Sign In</Button>
                  <Button component={Link} to="/signup" sx={{ background: '#E50914', color: '#fff', fontSize: '.85rem', px: 3, '&:hover': { background: '#ff1a25', transform: 'translateY(-1px)', boxShadow: '0 4px 16px rgba(229,9,20,.3)' }, transition: 'all .25s ease' }}>Get Started</Button>
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
