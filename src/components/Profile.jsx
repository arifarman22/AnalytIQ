import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Grid, Chip, Tabs, Tab, Button, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Paper, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Edit, Security, Analytics, Storage, History, Notifications, Payment, Download, CloudUpload, Person, Email, CalendarToday, Business, VerifiedUser } from '@mui/icons-material';

const Profile = () => {
  const t = useTheme();
  const c = t.palette.custom;
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Container maxWidth="md"><Box textAlign="center" mt={8}><Typography variant="h5" sx={{ color: 'text.secondary' }}>Please log in to view your profile</Typography></Box></Container>;

  const u = { name: user.name || 'User', email: user.email, role: 'Data Analyst', company: user.company || 'Not set', joinDate: new Date(user.created_at).toLocaleDateString(), plan: user.plan || 'Free', storage: { used: 2.5, total: 10, pct: 25 }, stats: { analyses: 147, datasets: 23, viz: 89 } };
  const activity = [{ a: 'Uploaded dataset', t: '2h ago', type: 'upload' }, { a: 'Completed analysis', t: '5h ago', type: 'analysis' }, { a: 'Created dashboard', t: '1d ago', type: 'dash' }, { a: 'Shared report', t: '2d ago', type: 'share' }];
  const TabPanel = ({ children, value, index }) => <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>;

  return (
    <Box sx={{ py: 4, background: c.bgSoft, minHeight: 'calc(100vh - 70px)', transition: 'background .3s ease' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: .5 }}>Profile</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>Manage your account</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 86 }}>
              <CardContent sx={{ p: 3.5, textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto', fontSize: '2rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff' }}>{u.name[0].toUpperCase()}</Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{u.name}</Typography>
                <Chip label={u.role} size="small" sx={{ mb: 2, background: c.accentLight, color: '#6C3AFF' }} />
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                  {[{ icon: <Email sx={{ color: '#6C3AFF', fontSize: 20 }} />, l: 'Email', v: u.email }, { icon: <Business sx={{ color: '#6C3AFF', fontSize: 20 }} />, l: 'Company', v: u.company }, { icon: <CalendarToday sx={{ color: '#6C3AFF', fontSize: 20 }} />, l: 'Member since', v: u.joinDate }, { icon: <VerifiedUser sx={{ color: '#6C3AFF', fontSize: 20 }} />, l: 'Plan', v: u.plan }].map((x, i) => (
                    <ListItem key={i} sx={{ px: 0 }}><ListItemIcon sx={{ minWidth: 36 }}>{x.icon}</ListItemIcon><ListItemText primary={<Typography variant="caption" sx={{ color: 'text.secondary' }}>{x.l}</Typography>} secondary={<Typography variant="body2">{x.v}</Typography>} /></ListItem>
                  ))}
                </Box>
                <Button variant="outlined" startIcon={<Edit />} fullWidth sx={{ mt: 2, borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }} onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit Profile'}</Button>
              </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Storage</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><Storage sx={{ color: '#6C3AFF', fontSize: 20 }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>{u.storage.used} GB / {u.storage.total} GB</Typography></Box>
                <LinearProgress variant="determinate" value={u.storage.pct} sx={{ height: 6, borderRadius: 3, background: c.bgMuted, '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#6C3AFF,#a855f7)' } }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: `1px solid ${c.borderLight}`, px: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: '#6C3AFF' }, '& .MuiTabs-indicator': { background: '#6C3AFF' } }}>
                  {[{ l: 'Overview', i: <Person /> }, { l: 'Activity', i: <History /> }, { l: 'Security', i: <Security /> }, { l: 'Billing', i: <Payment /> }].map((tt, i) => <Tab key={i} label={tt.l} icon={tt.i} iconPosition="start" />)}
                </Tabs>
                <TabPanel value={tab} index={0}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {[{ icon: <Analytics sx={{ fontSize: 28, color: '#6C3AFF' }} />, v: u.stats.analyses, l: 'Analyses' }, { icon: <Storage sx={{ fontSize: 28, color: '#6C3AFF' }} />, v: u.stats.datasets, l: 'Datasets' }, { icon: <Analytics sx={{ fontSize: 28, color: '#a855f7' }} />, v: u.stats.viz, l: 'Visualizations' }].map((s, i) => (
                        <Grid item xs={12} md={4} key={i}><Paper sx={{ p: 2.5, textAlign: 'center', border: `1px solid ${c.borderLight}`, background: c.card }}>{s.icon}<Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{s.v}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.l}</Typography></Paper></Grid>
                      ))}
                    </Grid>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Recent Activity</Typography>
                    <List>{activity.map((a, i) => <ListItem key={i} sx={{ px: 0 }}><ListItemIcon sx={{ minWidth: 36 }}>{a.type === 'upload' ? <CloudUpload sx={{ color: '#6C3AFF', fontSize: 20 }} /> : <Analytics sx={{ color: '#a855f7', fontSize: 20 }} />}</ListItemIcon><ListItemText primary={a.a} secondary={a.t} /></ListItem>)}</List>
                  </Box>
                </TabPanel>
                {[1, 2, 3].map(idx => <TabPanel key={idx} value={tab} index={idx}><Box sx={{ p: 3 }}><Typography sx={{ color: 'text.secondary' }}>{['', 'Activity history', 'Security settings', 'Billing info'][idx]} coming soon.</Typography></Box></TabPanel>)}
              </CardContent>
            </Card>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}><Button variant="outlined" startIcon={<Download />} fullWidth sx={{ py: 1.25, borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }}>Export Data</Button></Grid>
              <Grid item xs={12} sm={6}><Button variant="outlined" startIcon={<Notifications />} fullWidth sx={{ py: 1.25, borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }}>Notifications</Button></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Profile;
