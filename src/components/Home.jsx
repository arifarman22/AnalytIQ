import React, { useState } from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import { Analytics, ShowChart, AutoAwesome, Security, Dashboard, IntegrationInstructions, ArrowForward, ExpandMore, CloudUpload, Psychology, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => {
  const [ref, vis] = useScrollReveal(0.08);
  return <div ref={ref} className={`reveal ${vis ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>;
};

const Home = () => {
  const [faq, setFaq] = useState(false);

  const features = [
    { icon: <Analytics />, title: 'Advanced Analytics', desc: 'Statistical analysis and ML algorithms to uncover hidden patterns.' },
    { icon: <ShowChart />, title: 'Interactive Charts', desc: 'Beautiful Plotly visualizations that simplify complex data.' },
    { icon: <AutoAwesome />, title: 'AI Insights', desc: 'GPT-powered AI generates actionable insights instantly.' },
    { icon: <Security />, title: 'Enterprise Security', desc: 'End-to-end encryption with JWT auth and SSL.' },
    { icon: <Dashboard />, title: 'ML Predictions', desc: 'Auto-trained models with feature importance and metrics.' },
    { icon: <IntegrationInstructions />, title: 'REST API', desc: 'Full API with rate limiting, auth, and documentation.' },
  ];

  const steps = [
    { icon: <CloudUpload sx={{ fontSize: 28 }} />, n: '01', title: 'Upload', desc: 'Drag and drop CSV or Excel files.' },
    { icon: <Psychology sx={{ fontSize: 28 }} />, n: '02', title: 'Analyze', desc: 'Ask questions in plain English.' },
    { icon: <TrendingUp sx={{ fontSize: 28 }} />, n: '03', title: 'Predict', desc: 'Get EDA, charts, and ML predictions.' },
  ];

  const stats = [
    { n: '10K+', l: 'Users' }, { n: '2M+', l: 'Analyses' },
    { n: '95%', l: 'Accuracy' }, { n: '<2min', l: 'Avg Time' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Head of Data', text: 'AnalytIQ cut our analysis time by 80%. The AI insights surface patterns our team missed.', a: 'S' },
    { name: 'Marcus Johnson', role: 'VP Analytics', text: 'Best analytics tool we\'ve used. Clean interface, powerful engine, useful AI.', a: 'M' },
    { name: 'Priya Patel', role: 'Data Scientist', text: 'Upload to insights in under 2 minutes. The automated EDA saves hours weekly.', a: 'P' },
  ];

  const faqs = [
    { q: 'What file formats are supported?', a: 'CSV and Excel (.xlsx, .xls). JSON and Parquet coming soon.' },
    { q: 'How does the AI analysis work?', a: 'Comprehensive EDA with statistical summaries, correlations, outlier detection, then AI interprets results.' },
    { q: 'Is my data secure?', a: 'Encrypted in transit and at rest. Enterprise PostgreSQL with SSL. Isolated per account.' },
    { q: 'Can I use it for free?', a: 'Yes! Free tier includes 5 uploads/month with full EDA.' },
    { q: 'Do I need coding experience?', a: 'Not at all. Upload and ask in plain English.' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* HERO */}
      <Box sx={{ width: '100%', pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(229,9,20,.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <Chip label="AI-Powered Analytics" sx={{ mb: 3, px: 1.5, py: 2.5, fontSize: '.8rem', fontWeight: 400, background: 'rgba(229,9,20,.08)', color: '#E50914', border: '1px solid rgba(229,9,20,.15)', borderRadius: '50px' }} />
          </Reveal>
          <Reveal delay={1}>
            <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', mb: 3, maxWidth: 800, mx: 'auto' }}>
              Turn raw data into<br />
              <Box component="span" sx={{ color: '#E50914' }}>actionable insights</Box>
            </Typography>
          </Reveal>
          <Reveal delay={2}>
            <Typography sx={{ color: '#9ca3af', maxWidth: 520, mx: 'auto', mb: 5, fontSize: { xs: '.95rem', md: '1.1rem' }, fontWeight: 300, lineHeight: 1.8 }}>
              Upload any dataset, ask questions in plain English, and get comprehensive analysis with ML predictions — in seconds.
            </Typography>
          </Reveal>
          <Reveal delay={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button component={Link} to="/signup" endIcon={<ArrowForward sx={{ fontSize: 18 }} />} sx={{ py: 1.5, px: 4, fontSize: '.95rem', background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(229,9,20,.25)' }, transition: 'all .3s ease' }}>
                Start Free
              </Button>
              <Button component={Link} to="/pricing" sx={{ py: 1.5, px: 4, fontSize: '.95rem', color: '#9ca3af', border: '1px solid rgba(255,255,255,.08)', borderRadius: '10px', '&:hover': { borderColor: 'rgba(255,255,255,.15)', color: '#EAEAEA', background: 'rgba(255,255,255,.02)' }, transition: 'all .3s ease' }}>
                View Pricing
              </Button>
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* STATS */}
      <Box sx={{ width: '100%', py: 6 }}>
        <Container maxWidth="md">
          <Reveal>
            <Grid container spacing={3}>
              {stats.map((s, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 600, color: '#E50914', lineHeight: 1 }}>{s.n}</Typography>
                    <Typography sx={{ color: '#6b7280', fontSize: '.8rem', fontWeight: 400, mt: .5, textTransform: 'uppercase', letterSpacing: 1.5 }}>{s.l}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Reveal>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>Built for modern data teams</Typography>
              <Typography sx={{ color: '#9ca3af', maxWidth: 450, mx: 'auto', fontWeight: 300 }}>Everything you need from upload to insight.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={2.5}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Reveal delay={(i % 3) + 1}>
                  <Card sx={{ height: '100%', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', transition: 'all .3s ease', '&:hover': { border: '1px solid rgba(229,9,20,.15)', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(0,0,0,.3)' } }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(229,9,20,.08)', color: '#E50914', mb: 2.5, '& svg': { fontSize: 22 } }}>{f.icon}</Box>
                      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '.95rem' }}>{f.title}</Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: '.85rem', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>How it works</Typography>
              <Typography sx={{ color: '#9ca3af', fontWeight: 300 }}>Three steps. No code required.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={4}>
            {steps.map((s, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', position: 'relative' }}>
                      <Box sx={{ color: '#E50914' }}>{s.icon}</Box>
                      <Box sx={{ position: 'absolute', top: -2, right: -2, width: 22, height: 22, borderRadius: '50%', background: '#E50914', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', fontWeight: 600, color: '#fff' }}>{s.n}</Box>
                    </Box>
                    <Typography sx={{ fontWeight: 500, mb: .75 }}>{s.title}</Typography>
                    <Typography sx={{ color: '#9ca3af', fontSize: '.85rem', fontWeight: 300 }}>{s.desc}</Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>Trusted by teams</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={2.5}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Card sx={{ height: '100%', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', transition: 'all .3s ease', '&:hover': { border: '1px solid rgba(255,255,255,.08)' } }}>
                    <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Typography sx={{ color: '#9ca3af', fontSize: '.9rem', lineHeight: 1.8, fontWeight: 300, flexGrow: 1, mb: 3 }}>"{t.text}"</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, fontSize: '.8rem', background: '#E50914', color: '#fff' }}>{t.a}</Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 500, fontSize: '.85rem', lineHeight: 1.2 }}>{t.name}</Typography>
                          <Typography sx={{ color: '#6b7280', fontSize: '.75rem' }}>{t.role}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 14 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>FAQ</Typography>
            </Box>
          </Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={1}>
              <Accordion expanded={faq === i} onChange={(_, x) => setFaq(x ? i : false)} sx={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', borderRadius: '12px !important', mb: 1.5, '&.Mui-expanded': { border: '1px solid rgba(229,9,20,.1)' } }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#6b7280' }} />} sx={{ px: 3, py: .5 }}>
                  <Typography sx={{ fontWeight: 400, fontSize: '.95rem' }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                  <Typography sx={{ color: '#9ca3af', lineHeight: 1.8, fontWeight: 300, fontSize: '.9rem' }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <Reveal>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 1.5 }}>Ready to start?</Typography>
              <Typography sx={{ color: '#9ca3af', mb: 4, fontWeight: 300 }}>Join thousands of teams using AnalytIQ.</Typography>
              <Button component={Link} to="/signup" endIcon={<ArrowForward sx={{ fontSize: 18 }} />} sx={{ py: 1.5, px: 5, fontSize: '.95rem', background: '#E50914', color: '#fff', borderRadius: '10px', '&:hover': { background: '#ff1a25', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(229,9,20,.25)' }, transition: 'all .3s ease' }}>
                Get Started Free
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};
export default Home;
