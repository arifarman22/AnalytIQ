import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  Chip,
  Divider,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Paper,
  Container
} from '@mui/material';
import {
  Edit,
  Security,
  Analytics,
  Storage,
  History,
  Notifications,
  Payment,
  Download,
  CloudUpload,
  Person,
  Email,
  CalendarToday,
  Business,
  Phone,
  LocationOn,
  VerifiedUser
} from '@mui/icons-material';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={8}>
          <Typography variant="h4" color="text.secondary">
            Please log in to view your profile
          </Typography>
        </Box>
      </Container>
    );
  }

  // Sample user data - in real app, this would come from backend
  const userData = {
    name: user.name || 'Alex Johnson',
    email: user.email,
    role: 'Data Analyst',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2024',
    lastLogin: '2 hours ago',
    plan: 'Enterprise',
    status: 'Active',
    storage: {
      used: 2.5,
      total: 10,
      percentage: 25
    },
    stats: {
      analyses: 147,
      datasets: 23,
      visualizations: 89
    }
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const tabs = [
    { label: 'Overview', icon: <Person /> },
    { label: 'Activity', icon: <History /> },
    { label: 'Settings', icon: <Security /> },
    { label: 'Billing', icon: <Payment /> }
  ];

  const recentActivity = [
    { action: 'Uploaded dataset', time: '2 hours ago', type: 'upload' },
    { action: 'Completed analysis', time: '5 hours ago', type: 'analysis' },
    { action: 'Created dashboard', time: '1 day ago', type: 'dashboard' },
    { action: 'Shared report', time: '2 days ago', type: 'share' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Sidebar - User Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 3,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  mx: 'auto'
                }}
              >
                {userData.name[0].toUpperCase()}
              </Avatar>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                {userData.name}
              </Typography>
              
              <Chip
                label={userData.role}
                color="primary"
                variant="filled"
                size="small"
                sx={{ mb: 2 }}
              />

              <Box sx={{ textAlign: 'left', mt: 3 }}>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={userData.email} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Business color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Company" secondary={userData.company} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Member since" secondary={userData.joinDate} />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <VerifiedUser color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Plan" 
                    secondary={
                      <Chip 
                        label={userData.plan} 
                        color="success" 
                        size="small" 
                        variant="outlined" 
                      />
                    } 
                  />
                </ListItem>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </CardContent>
          </Card>

          {/* Storage Usage */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Storage Usage
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Storage color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {userData.storage.used} GB of {userData.storage.total} GB used
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={userData.storage.percentage} 
                sx={{ mb: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {userData.storage.percentage}% utilized
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  px: 3
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    icon={tab.icon}
                    iconPosition="start"
                  />
                ))}
              </Tabs>

              {/* Overview Tab */}
              <TabPanel value={activeTab} index={0}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Statistics */}
                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Analytics color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h4" fontWeight={700}>
                          {userData.stats.analyses}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Analyses
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Storage color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h4" fontWeight={700}>
                          {userData.stats.datasets}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Datasets
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Analytics color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h4" fontWeight={700}>
                          {userData.stats.visualizations}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Visualizations
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Recent Activity */}
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Recent Activity
                      </Typography>
                      <List>
                        {recentActivity.map((activity, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              {activity.type === 'upload' && <CloudUpload color="primary" />}
                              {activity.type === 'analysis' && <Analytics color="primary" />}
                              {activity.type === 'dashboard' && <Analytics color="primary" />}
                              {activity.type === 'share' && <Notifications color="primary" />}
                            </ListItemIcon>
                            <ListItemText
                              primary={activity.action}
                              secondary={activity.time}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Other tabs would go here with similar structure */}
              <TabPanel value={activeTab} index={1}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Activity History
                  </Typography>
                  <Typography color="text.secondary">
                    Detailed activity log and history will be displayed here.
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Account Settings
                  </Typography>
                  <Typography color="text.secondary">
                    Security and privacy settings will be displayed here.
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Billing Information
                  </Typography>
                  <Typography color="text.secondary">
                    Subscription and payment details will be displayed here.
                  </Typography>
                </Box>
              </TabPanel>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Export Data
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                startIcon={<Notifications />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Notification Settings
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;