import React from 'react';
import { Container, Box, Typography, Card, CardContent, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';

const Settings = ({ user }) => {
  if (!user) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Typography variant="h4" color="text.secondary">Please log in to view settings</Typography>
        </Box>
      </Container>
    );
  }

  const settings = [
    { label: 'Email Notifications', description: 'Receive analysis completion alerts', default: true },
    { label: 'Dark Mode', description: 'Use dark theme across the platform', default: true },
    { label: 'Auto-save Analysis', description: 'Automatically save analysis results', default: true },
    { label: 'Share Usage Data', description: 'Help improve AnalytIQ with anonymous usage data', default: false },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>Settings</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Manage your preferences</Typography>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <List>
            {settings.map((item, i) => (
              <React.Fragment key={item.label}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText primary={item.label} secondary={item.description} />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked={item.default} color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>
                {i < settings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Settings;
