import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Grid, Button, List, ListItem, ListItemIcon, ListItemText, Container } from '@mui/material';
import { Edit, Email, CalendarToday, Business, Person } from '@mui/icons-material';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Container maxWidth="md"><Box textAlign="center" mt={8}><Typography sx={{ color: '#6b7280' }}>Please log in</Typography></Box></Container>;

  const info = [
    { icon: <Email sx={{ fontSize: 18 }} />, l: 'Email', v: user.email },
    { icon: <Business sx={{ fontSize: 18 }} />, l: 'Company', v: user.company || 'Not set' },
    { icon: <CalendarToday sx={{ fontSize: 18 }} />, l: 'Joined', v: new Date(user.created_at).toLocaleDateString() },
    { icon: <Person sx={{ fontSize: 18 }} />, l: 'Plan', v: user.plan || 'Free' },
  ];

  return (
    <Box sx={{ py: 4, width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="sm">
        <Card sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, background: '#E50914', fontSize: '1.5rem', fontWeight: 500 }}>{(user.name?.[0] || 'U').toUpperCase()}</Avatar>
            <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', mb: .25 }}>{user.name}</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: '.85rem', fontWeight: 300, mb: 3 }}>{user.email}</Typography>
            <List sx={{ textAlign: 'left' }}>
              {info.map((x, i) => (
                <ListItem key={i} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: '#6b7280' }}>{x.icon}</ListItemIcon>
                  <ListItemText primary={<Typography sx={{ color: '#6b7280', fontSize: '.75rem', fontWeight: 400 }}>{x.l}</Typography>} secondary={<Typography sx={{ fontSize: '.88rem', fontWeight: 400 }}>{x.v}</Typography>} />
                </ListItem>
              ))}
            </List>
            <Button startIcon={<Edit sx={{ fontSize: 16 }} />} fullWidth sx={{ mt: 2, border: '1px solid rgba(255,255,255,.08)', color: '#9ca3af', borderRadius: '10px', '&:hover': { borderColor: 'rgba(229,9,20,.2)', color: '#EAEAEA' } }}>Edit Profile</Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
export default Profile;
