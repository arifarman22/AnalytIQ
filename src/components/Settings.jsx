import React from 'react';
import { Container, Box, Typography, Card, CardContent, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';

const Settings = () => {
  const items = [
    { label: 'Email Notifications', desc: 'Receive analysis completion alerts', def: true },
    { label: 'Dark Mode', desc: 'Use dark theme across the platform', def: false },
    { label: 'Auto-save Analysis', desc: 'Automatically save analysis results', def: true },
    { label: 'Share Usage Data', desc: 'Help improve AnalytIQ with anonymous data', def: false },
  ];
  return (
    <Box sx={{ py: 4, background: '#fafbfc', minHeight: 'calc(100vh - 70px)' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}><Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Settings</Typography><Typography variant="body1" sx={{ color: '#64748b' }}>Manage your preferences</Typography></Box>
        <Card sx={{ border: '1px solid #f1f5f9' }}>
          <CardContent sx={{ p: 0 }}>
            <List>
              {items.map((it, i) => (
                <React.Fragment key={it.label}>
                  <ListItem sx={{ py: 2.5, px: 3 }}>
                    <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>{it.label}</Typography>} secondary={<Typography variant="body2" sx={{ color: '#94a3b8' }}>{it.desc}</Typography>} />
                    <ListItemSecondaryAction><Switch defaultChecked={it.def} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6C3AFF' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#c4b5fd' } }} /></ListItemSecondaryAction>
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
