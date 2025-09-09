import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard,
  AccountCircle,
  ExitToApp,
  ContactPage,
  AttachMoney,
  Home,
  Analytics,
  Settings
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawer(!mobileDrawer);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Pricing', path: '/pricing', icon: <AttachMoney /> },
    { label: 'Contact', path: '/contact', icon: <ContactPage /> },
  ];

  const profileMenuItems = [
    { label: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { label: 'Settings', path: '/settings', icon: <Settings /> },
    { label: 'Logout', action: handleLogout, icon: <ExitToApp /> },
  ];

  const renderDesktopNav = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #7c4dff, #651fff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mr: 4
          }}
        >
          AnalytIQ
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                mx: 1,
                color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                fontWeight: location.pathname === item.path ? 600 : 400,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {user ? (
          <>
            <Chip
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</Avatar>}
              label={user.name || user.email}
              variant="outlined"
              onClick={handleProfileMenuOpen}
              sx={{
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              {profileMenuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={item.action || handleMenuClose}
                  component={item.path ? Link : 'li'}
                  to={item.path}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3,
                background: 'linear-gradient(45deg, #7c4dff, #651fff)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #651fff, #7c4dff)'
                }
              }}
            >
              Get Started
            </Button>
          </>
        )}
      </Box>
    </>
  );

  const renderMobileNav = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={toggleMobileDrawer}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Typography 
        variant="h6" 
        component={Link} 
        to="/" 
        sx={{ 
          textDecoration: 'none',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #7c4dff, #651fff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          flexGrow: 1
        }}
      >
        AnalytIQ
      </Typography>

      <Drawer
        anchor="right"
        open={mobileDrawer}
        onClose={toggleMobileDrawer}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                button
                component={Link}
                to={item.path}
                onClick={toggleMobileDrawer}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {user ? (
            <List>
              {profileMenuItems.map((item) => (
                <ListItem
                  key={item.label}
                  button
                  component={item.path ? Link : 'li'}
                  to={item.path}
                  onClick={item.action || toggleMobileDrawer}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2 }}>
              <Button
                fullWidth
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ mb: 1, borderRadius: 2 }}
                onClick={toggleMobileDrawer}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                component={Link}
                to="/signup"
                variant="contained"
                sx={{ borderRadius: 2 }}
                onClick={toggleMobileDrawer}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        backgroundImage: 'none'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
        {isMobile ? renderMobileNav() : renderDesktopNav()}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;