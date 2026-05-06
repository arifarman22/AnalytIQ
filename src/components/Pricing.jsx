import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Container, Button, Chip, Stack } from '@mui/material';
import { Check, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => { const [r, v] = useScrollReveal(.08); return <div ref={r} className={`reveal ${v ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>; };

const plans = [
  { name: 'Free', price: '$0', desc: 'Basic exploration.', features: ['5 datasets/month', 'Basic EDA', 'CSV uploads', 'Community support'], pop: false },
  { name: 'Pro', price: '$19', desc: 'Full AI + ML power.', features: ['Unlimited datasets', 'AI insights', 'ML predictions', 'Priority support', 'Export reports', 'All formats'], pop: true },
  { name: 'Enterprise', price: 'Custom', desc: 'For large teams.', features: ['Everything in Pro', 'Dedicated manager', 'SSO & SAML', 'Custom integrations', 'SLA guarantee'], pop: false },
];

const Pricing = () => (
  <Box sx={{ width: '100%', py: { xs: 8, md: 14 }, minHeight: 'calc(100vh - 64px)' }}>
    <Container maxWidth="lg">
      <Reveal>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1.5 }}>Simple pricing</Typography>
          <Typography sx={{ color: '#9ca3af', fontWeight: 300 }}>Choose what fits. Upgrade anytime.</Typography>
        </Box>
      </Reveal>
      <Grid container spacing={2.5} justifyContent="center">
        {plans.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={p.name}>
            <Reveal delay={i + 1}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: 'rgba(255,255,255,.02)', border: p.pop ? '1px solid rgba(229,9,20,.3)' : '1px solid rgba(255,255,255,.04)', transition: 'all .3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(0,0,0,.3)' } }}>
                {p.pop && <Chip label="Popular" size="small" sx={{ position: 'absolute', top: 14, right: 14, background: '#E50914', color: '#fff', fontWeight: 500, fontSize: '.7rem' }} />}
                <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500, mb: .5 }}>{p.name}</Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: '.82rem', fontWeight: 300, mb: 2.5 }}>{p.desc}</Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '2.2rem', fontWeight: 600, display: 'inline' }}>{p.price}</Typography>
                    {p.price !== 'Custom' && <Typography component="span" sx={{ color: '#6b7280', fontSize: '.82rem', ml: .5 }}>/mo</Typography>}
                  </Box>
                  <Stack spacing={1.2} sx={{ flexGrow: 1, mb: 3 }}>
                    {p.features.map(f => (
                      <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Check sx={{ fontSize: 14, color: '#E50914' }} />
                        <Typography sx={{ color: '#9ca3af', fontSize: '.83rem', fontWeight: 300 }}>{f}</Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button component={Link} to="/signup" fullWidth endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                    sx={p.pop ? { background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25' } } : { border: '1px solid rgba(255,255,255,.08)', color: '#9ca3af', borderRadius: '10px', '&:hover': { borderColor: 'rgba(255,255,255,.15)', color: '#EAEAEA' } }}>
                    {p.price === 'Custom' ? 'Contact' : 'Get Started'}
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
