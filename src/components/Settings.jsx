import React from 'react';
import { Container, Box, Typography, Card, CardContent, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';

const Settings = () => {
  const items = [
    { label: 'Email Notifications', desc: 'Receive analysis completion alerts', def: true },
    { label: 'Auto-save Analysis', desc: 'Automatically save analysis results', def: true },
    { label: 'Share Usage Data', desc: 'Help improve AnalytIQ with anonymous data', def: false },
  ];
  return (
    <Box sx={{ py: 4, width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontWeight: 500, fontSize: '1.3rem', mb: .5 }}>Settings</Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300 }}>Manage preferences</Typography>
        </Box>
        <Card sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)' }}>
          <CardContent sx={{ p: 0 }}>
            <List>
              {items.map((it, i) => (
                <React.Fragment key={it.label}>
                  <ListItem sx={{ py: 2.5, px: 3 }}>
                    <ListItemText primary={<Typography sx={{ fontWeight: 400, fontSize: '.9rem' }}>{it.label}</Typography>} secondary={<Typography sx={{ color: '#6b7280', fontSize: '.8rem', fontWeight: 300 }}>{it.desc}</Typography>} />
                    <ListItemSecondaryAction><Switch defaultChecked={it.def} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#E50914' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'rgba(229,9,20,.4)' } }} /></ListItemSecondaryAction>
                  </ListItem>
                  {i < items.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,.03)' }} />}
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
