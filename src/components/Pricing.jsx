import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Container, Button, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Check, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => { const [r, v] = useScrollReveal(.12); return <div ref={r} className={`reveal ${v ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>; };

const plans = [
  { name: 'Free', price: '$0', desc: 'Basic data exploration and analysis.', features: ['5 datasets / month', 'Basic EDA', 'CSV uploads', 'Community support'], pop: false },
  { name: 'Pro', price: '$19', desc: 'Advanced AI insights and priority support.', features: ['Unlimited datasets', 'AI-powered insights', 'All file formats', 'Priority support', 'Export reports', 'Custom visualizations'], pop: true },
  { name: 'Enterprise', price: 'Custom', desc: 'Tailored solutions for large teams.', features: ['Everything in Pro', 'Dedicated manager', 'SSO & SAML', 'Custom integrations', 'SLA guarantee', 'On-premise option'], pop: false },
];

const Pricing = () => {
  const t = useTheme();
  const c = t.palette.custom;
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, background: c.bgSoft, minHeight: 'calc(100vh - 70px)', transition: 'background .3s ease' }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Chip label="Pricing" size="small" sx={{ mb: 2, background: c.accentLight, color: '#6C3AFF', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Simple, transparent pricing</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto' }}>Choose the plan that fits your needs. Upgrade anytime.</Typography>
          </Box>
        </Reveal>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {plans.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={p.name}>
              <Reveal delay={i + 1}>
                <Card sx={{
                  height: '100%', display: 'flex', flexDirection: 'column', position: 'relative',
                  border: p.pop ? '2px solid #6C3AFF' : `1px solid ${c.borderLight}`,
                  transition: 'all .3s ease',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: c.shadowHover },
                }}>
                  {p.pop && <Chip label="Most Popular" size="small" sx={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff', fontWeight: 700, fontSize: '.7rem' }} />}
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{p.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, minHeight: 40 }}>{p.desc}</Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, display: 'inline' }}>{p.price}</Typography>
                      {p.price !== 'Custom' && <Typography variant="body2" component="span" sx={{ color: 'text.secondary', ml: .5 }}>/month</Typography>}
                    </Box>
                    <Stack spacing={1.5} sx={{ flexGrow: 1, mb: 3 }}>
                      {p.features.map(f => (
                        <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Check sx={{ fontSize: 16, color: '#6C3AFF' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{f}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Button component={Link} to="/signup" fullWidth variant={p.pop ? 'contained' : 'outlined'} endIcon={<ArrowForward />}
                      sx={{ py: 1.25, ...(p.pop ? { background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', boxShadow: '0 4px 14px rgba(108,58,255,.25)' } : { borderColor: c.border, color: 'text.primary', '&:hover': { borderColor: '#a78bfa', background: c.cardHover } }) }}>
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
};
export default Pricing;
