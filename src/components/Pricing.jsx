import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Container, Button, Chip, Stack } from '@mui/material';
import { Check, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => { const [r, v] = useScrollReveal(.12); return <div ref={r} className={`reveal ${v ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>; };

const plans = [
  { name: 'Free', price: '$0', desc: 'Basic data exploration and analysis.', features: ['5 datasets / month', 'Basic EDA', 'CSV uploads', 'Community support'], pop: false },
  { name: 'Pro', price: '$19', desc: 'Advanced AI insights and priority support.', features: ['Unlimited datasets', 'AI-powered insights', 'All file formats', 'Priority support', 'Export reports', 'Custom visualizations'], pop: true },
  { name: 'Enterprise', price: 'Custom', desc: 'Tailored solutions for large teams.', features: ['Everything in Pro', 'Dedicated manager', 'SSO & SAML', 'Custom integrations', 'SLA guarantee', 'On-premise option'], pop: false },
];

const Pricing = () => (
  <Box sx={{ py: { xs: 8, md: 14 }, background: '#fafbfc', minHeight: 'calc(100vh - 70px)' }}>
    <Container maxWidth="lg">
      <Reveal>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Chip label="Pricing" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Simple, transparent pricing</Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 460, mx: 'auto' }}>Choose the plan that fits your needs. Upgrade anytime.</Typography>
        </Box>
      </Reveal>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {plans.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={p.name}>
            <Reveal delay={i + 1}>
              <Card sx={{
                height: '100%', display: 'flex', flexDirection: 'column', position: 'relative',
                border: p.pop ? '2px solid #6C3AFF' : '1px solid #f1f5f9',
                transition: 'all .3s ease',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: p.pop ? '0 12px 40px rgba(108,58,255,.12)' : '0 12px 40px rgba(0,0,0,.06)' },
              }}>
                {p.pop && <Chip label="Most Popular" size="small" sx={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff', fontWeight: 700, fontSize: '.7rem' }} />}
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{p.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 3, minHeight: 40 }}>{p.desc}</Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', display: 'inline' }}>{p.price}</Typography>
                    {p.price !== 'Custom' && <Typography variant="body2" component="span" sx={{ color: '#94a3b8', ml: .5 }}>/month</Typography>}
                  </Box>
                  <Stack spacing={1.5} sx={{ flexGrow: 1, mb: 3 }}>
                    {p.features.map(f => (
                      <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Check sx={{ fontSize: 16, color: '#6C3AFF' }} />
                        <Typography variant="body2" sx={{ color: '#64748b' }}>{f}</Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button component={Link} to="/signup" fullWidth variant={p.pop ? 'contained' : 'outlined'} endIcon={<ArrowForward />} sx={{ py: 1.25 }}>
                    {p.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
export default Pricing;
