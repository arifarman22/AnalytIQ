import React from 'react';
import { Container, Box, Typography, Card, CardContent, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../context/ThemeContext';

const Settings = () => {
  const t = useTheme();
  const c = t.palette.custom;
  const { mode, toggle } = useThemeMode();

  const items = [
    { label: 'Email Notifications', desc: 'Receive analysis completion alerts', def: true },
    { label: 'Dark Mode', desc: 'Use dark theme across the platform', def: mode === 'dark', onChange: toggle },
    { label: 'Auto-save Analysis', desc: 'Automatically save analysis results', def: true },
    { label: 'Share Usage Data', desc: 'Help improve AnalytIQ with anonymous data', def: false },
  ];

  return (
    <Box sx={{ py: 4, background: c.bgSoft, minHeight: 'calc(100vh - 70px)', transition: 'background .3s ease' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Settings</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>Manage your preferences</Typography>
        </Box>
        <Card>
          <CardContent sx={{ p: 0 }}>
            <List>
              {items.map((it, i) => (
                <React.Fragment key={it.label}>
                  <ListItem sx={{ py: 2.5, px: 3 }}>
                    <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>{it.label}</Typography>} secondary={<Typography variant="body2" sx={{ color: 'text.secondary' }}>{it.desc}</Typography>} />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={it.def}
                        onChange={it.onChange}
                        sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6C3AFF' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#c4b5fd' } }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  {i < items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
export default Settings;
