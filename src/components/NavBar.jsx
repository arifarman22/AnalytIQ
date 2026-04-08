import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar, Chip, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Dashboard, AccountCircle, ExitToApp, ContactPage, AttachMoney, Home, Analytics, Settings } from '@mui/icons-material';
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

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0', backgroundImage: 'none' }}>
      <Toolbar sx={{ minHeight: { xs: 64, md: 70 }, maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        {mobile ? (
          <>
            <IconButton edge="start" onClick={() => setDrawer(true)} sx={{ mr: 1, color: '#0f172a' }}><MenuIcon /></IconButton>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 800, color: '#6C3AFF', flexGrow: 1 }}>AnalytIQ</Typography>
            <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)} PaperProps={{ sx: { width: 280, background: '#fff' } }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>Menu</Typography>
                <Divider sx={{ mb: 2 }} />
                <List>{nav.map(n => (
                  <ListItem key={n.label} button component={Link} to={n.path} onClick={() => setDrawer(false)} selected={loc.pathname === n.path} sx={{ borderRadius: 2, mb: .5, '&.Mui-selected': { background: '#ede9fe', color: '#6C3AFF' } }}>
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
              <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 800, color: '#6C3AFF', mr: 5, letterSpacing: '-0.02em' }}>AnalytIQ</Typography>
              <Box sx={{ display: 'flex', gap: .5 }}>
                {nav.map(n => (
                  <Button key={n.label} component={Link} to={n.path} sx={{
                    px: 2, color: loc.pathname === n.path ? '#6C3AFF' : '#64748b', fontWeight: loc.pathname === n.path ? 600 : 400,
                    fontSize: '.9rem', borderRadius: 50, background: loc.pathname === n.path ? '#ede9fe' : 'transparent',
                    '&:hover': { background: '#f8f9fb', color: '#0f172a' },
                  }}>{n.label}</Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {user ? (
                <>
                  <Chip
                    avatar={<Avatar sx={{ width: 28, height: 28, fontSize: '.8rem' }}>{(user.name?.[0] || user.email?.[0])?.toUpperCase()}</Avatar>}
                    label={user.name || user.email} variant="outlined"
                    onClick={e => setAnchorEl(e.currentTarget)}
                    sx={{ borderColor: '#e2e8f0', '&:hover': { borderColor: '#c4b5fd', background: '#faf5ff' } }}
                  />
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1.5, minWidth: 200, borderRadius: 3, boxShadow: '0 8px 30px rgba(0,0,0,.1)' } }}>
                    {profileMenu.map(p => (
                      <MenuItem key={p.label} onClick={p.action || (() => setAnchorEl(null))} component={p.path ? Link : 'li'} to={p.path} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ color: '#64748b', minWidth: 36 }}>{p.icon}</ListItemIcon>
                        <ListItemText>{p.label}</ListItemText>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" variant="outlined" sx={{ px: 3 }}>Sign In</Button>
                  <Button component={Link} to="/signup" variant="contained" sx={{ px: 3 }}>Get Started</Button>
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
