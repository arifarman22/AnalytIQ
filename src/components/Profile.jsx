import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Grid, Chip, Tabs, Tab, Button, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Paper, Container } from '@mui/material';
import { Edit, Security, Analytics, Storage, History, Notifications, Payment, Download, CloudUpload, Person, Email, CalendarToday, Business, VerifiedUser } from '@mui/icons-material';

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Container maxWidth="md"><Box textAlign="center" mt={8}><Typography variant="h5" sx={{ color: '#64748b' }}>Please log in to view your profile</Typography></Box></Container>;

  const u = { name: user.name || 'User', email: user.email, role: 'Data Analyst', company: 'TechCorp Inc.', joinDate: 'Jan 15, 2024', plan: 'Enterprise', storage: { used: 2.5, total: 10, pct: 25 }, stats: { analyses: 147, datasets: 23, viz: 89 } };
  const activity = [{ a: 'Uploaded dataset', t: '2h ago', type: 'upload' }, { a: 'Completed analysis', t: '5h ago', type: 'analysis' }, { a: 'Created dashboard', t: '1d ago', type: 'dash' }, { a: 'Shared report', t: '2d ago', type: 'share' }];
  const TabPanel = ({ children, value, index }) => <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>;
  const ic = { color: '#6C3AFF', fontSize: 20 };

  return (
    <Box sx={{ py: 4, background: '#fafbfc', minHeight: 'calc(100vh - 70px)' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}><Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Profile</Typography><Typography variant="body1" sx={{ color: '#64748b' }}>Manage your account</Typography></Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 86, border: '1px solid #f1f5f9' }}>
              <CardContent sx={{ p: 3.5, textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto', fontSize: '2rem' }}>{u.name[0].toUpperCase()}</Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{u.name}</Typography>
                <Chip label={u.role} size="small" sx={{ mb: 2 }} />
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                  {[{ icon: <Email sx={ic} />, l: 'Email', v: u.email }, { icon: <Business sx={ic} />, l: 'Company', v: u.company }, { icon: <CalendarToday sx={ic} />, l: 'Member since', v: u.joinDate }, { icon: <VerifiedUser sx={ic} />, l: 'Plan', v: u.plan }].map((x, i) => (
                    <ListItem key={i} sx={{ px: 0 }}><ListItemIcon sx={{ minWidth: 36 }}>{x.icon}</ListItemIcon><ListItemText primary={<Typography variant="caption" sx={{ color: '#94a3b8' }}>{x.l}</Typography>} secondary={<Typography variant="body2">{x.v}</Typography>} /></ListItem>
                  ))}
                </Box>
                <Button variant="outlined" startIcon={<Edit />} fullWidth sx={{ mt: 2 }} onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit Profile'}</Button>
              </CardContent>
            </Card>
            <Card sx={{ mt: 2, border: '1px solid #f1f5f9' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Storage</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><Storage sx={ic} /><Typography variant="body2" sx={{ color: '#64748b' }}>{u.storage.used} GB / {u.storage.total} GB</Typography></Box>
                <LinearProgress variant="determinate" value={u.storage.pct} sx={{ height: 6, borderRadius: 3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ border: '1px solid #f1f5f9' }}>
              <CardContent sx={{ p: 0 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: '1px solid #f1f5f9', px: 3 }}>
                  {[{ l: 'Overview', i: <Person /> }, { l: 'Activity', i: <History /> }, { l: 'Security', i: <Security /> }, { l: 'Billing', i: <Payment /> }].map((t, i) => <Tab key={i} label={t.l} icon={t.i} iconPosition="start" />)}
                </Tabs>
                <TabPanel value={tab} index={0}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {[{ icon: <Analytics sx={{ fontSize: 28, color: '#6C3AFF' }} />, v: u.stats.analyses, l: 'Analyses' }, { icon: <Storage sx={{ fontSize: 28, color: '#6C3AFF' }} />, v: u.stats.datasets, l: 'Datasets' }, { icon: <Analytics sx={{ fontSize: 28, color: '#a855f7' }} />, v: u.stats.viz, l: 'Visualizations' }].map((s, i) => (
                        <Grid item xs={12} md={4} key={i}><Paper sx={{ p: 2.5, textAlign: 'center', border: '1px solid #f1f5f9' }}>{s.icon}<Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{s.v}</Typography><Typography variant="caption" sx={{ color: '#94a3b8' }}>{s.l}</Typography></Paper></Grid>
                      ))}
                    </Grid>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Recent Activity</Typography>
                    <List>{activity.map((a, i) => <ListItem key={i} sx={{ px: 0 }}><ListItemIcon sx={{ minWidth: 36 }}>{a.type === 'upload' ? <CloudUpload sx={ic} /> : <Analytics sx={{ color: '#a855f7', fontSize: 20 }} />}</ListItemIcon><ListItemText primary={a.a} secondary={a.t} /></ListItem>)}</List>
                  </Box>
                </TabPanel>
                {[1, 2, 3].map(idx => <TabPanel key={idx} value={tab} index={idx}><Box sx={{ p: 3 }}><Typography sx={{ color: '#94a3b8' }}>{['', 'Activity history', 'Security settings', 'Billing info'][idx]} coming soon.</Typography></Box></TabPanel>)}
              </CardContent>
            </Card>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}><Button variant="outlined" startIcon={<Download />} fullWidth sx={{ py: 1.25 }}>Export Data</Button></Grid>
              <Grid item xs={12} sm={6}><Button variant="outlined" startIcon={<Notifications />} fullWidth sx={{ py: 1.25 }}>Notifications</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Profile;
