import React, { useState } from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import { Analytics, ShowChart, AutoAwesome, Security, Dashboard, IntegrationInstructions, ArrowForward, ExpandMore, CloudUpload, Psychology, TrendingUp, FormatQuote, CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, vis] = useScrollReveal(0.12);
  return <div ref={ref} className={`reveal ${vis ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
};

const Home = () => {
  const [faq, setFaq] = useState(false);

  const logos = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Ind.', 'Wayne Ent.'];

  const features = [
    { icon: <Analytics sx={{ fontSize: 28 }} />, title: 'Advanced Analytics', desc: 'Statistical analysis and ML algorithms to uncover hidden patterns.' },
    { icon: <ShowChart sx={{ fontSize: 28 }} />, title: 'Interactive Charts', desc: 'Beautiful interactive visualizations that simplify complex data.' },
    { icon: <AutoAwesome sx={{ fontSize: 28 }} />, title: 'AI Insights', desc: 'AI generates actionable insights and predictive analytics.' },
    { icon: <Security sx={{ fontSize: 28 }} />, title: 'Enterprise Security', desc: 'End-to-end encryption with industry compliance standards.' },
    { icon: <Dashboard sx={{ fontSize: 28 }} />, title: 'Live Dashboards', desc: 'Real-time monitoring with customizable dashboards.' },
    { icon: <IntegrationInstructions sx={{ fontSize: 28 }} />, title: 'API & Integrations', desc: 'Connect your existing tools through our API ecosystem.' },
  ];

  const steps = [
    { icon: <CloudUpload sx={{ fontSize: 28 }} />, n: '01', title: 'Upload Data', desc: 'Drag and drop CSV or Excel files. We handle the rest.' },
    { icon: <Psychology sx={{ fontSize: 28 }} />, n: '02', title: 'Ask Anything', desc: 'Describe what you want to know in plain English.' },
    { icon: <TrendingUp sx={{ fontSize: 28 }} />, n: '03', title: 'Get Results', desc: 'Receive EDA, visualizations, and AI recommendations.' },
  ];

  const stats = [
    { n: '10K+', l: 'Active Users' }, { n: '2M+', l: 'Analyses Run' },
    { n: '95%', l: 'Accuracy Rate' }, { n: '<2min', l: 'Avg. Analysis Time' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Head of Data, Fintech Co.', text: 'AnalytIQ cut our analysis time by 80%. The AI insights surface patterns our team would have missed.', a: 'S' },
    { name: 'Marcus Johnson', role: 'VP Analytics, Retail Corp', text: 'The best analytics tool we\'ve used. Clean interface, powerful engine, genuinely useful AI recommendations.', a: 'M' },
    { name: 'Priya Patel', role: 'Data Scientist, HealthTech', text: 'From upload to insights in under 2 minutes. The automated EDA alone saves us hours every week.', a: 'P' },
  ];

  const faqs = [
    { q: 'What file formats are supported?', a: 'CSV and Excel (.xlsx, .xls). JSON, Parquet, and database connections coming soon.' },
    { q: 'How does the AI analysis work?', a: 'We perform comprehensive EDA — statistical summaries, correlations, outlier detection, normality tests — then our AI interprets results into human-readable insights.' },
    { q: 'Is my data secure?', a: 'All data is encrypted in transit and at rest. Enterprise-grade PostgreSQL with SSL. Datasets are isolated per account.' },
    { q: 'Can I use it for free?', a: 'Yes! Free tier includes 5 uploads/month with full EDA. Upgrade to Pro for unlimited datasets and AI insights.' },
    { q: 'Do I need coding experience?', a: 'Not at all. Upload data and ask questions in plain English. Designed for both technical and non-technical users.' },
  ];

  return (
    <Box>
      {/* ── HERO ── */}
      <Box sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(108,58,255,.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Chip label="✦ AI-Powered Analytics Platform" sx={{ mb: 3, px: 1.5, py: 2.5, fontSize: '.85rem', fontWeight: 600, background: '#ede9fe', color: '#6C3AFF', border: 'none' }} />
          </Reveal>
          <Reveal delay={1}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.8rem', md: '4.5rem' }, fontWeight: 800, color: '#0f172a', mb: 3, maxWidth: 720, mx: 'auto' }}>
              Turn raw data into{' '}
              <Box component="span" sx={{ background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                real insights
              </Box>
            </Typography>
          </Reveal>
          <Reveal delay={2}>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: 540, mx: 'auto', mb: 5, fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 400, lineHeight: 1.7 }}>
              Upload any dataset, ask questions in plain English, and get comprehensive analysis with AI-powered recommendations — in seconds.
            </Typography>
          </Reveal>
          <Reveal delay={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button component={Link} to="/signup" variant="contained" size="large" endIcon={<ArrowForward />} sx={{ py: 1.5, px: 4, fontSize: '1rem' }}>
                Start Free
              </Button>
              <Button component={Link} to="/pricing" variant="outlined" size="large" sx={{ py: 1.5, px: 4, fontSize: '1rem' }}>
                See Pricing
              </Button>
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* ── LOGO BAR ── */}
      <Box sx={{ py: 5, borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#fafbfc' }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, mb: 3, fontSize: '.7rem' }}>
              Trusted by data teams worldwide
            </Typography>
            <Stack direction="row" spacing={{ xs: 3, md: 7 }} justifyContent="center" flexWrap="wrap" useFlexGap>
              {logos.map(l => <Typography key={l} sx={{ color: '#cbd5e1', fontWeight: 700, fontSize: { xs: '1rem', md: '1.15rem' }, letterSpacing: 1 }}>{l}</Typography>)}
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* ── FEATURES ── */}
      <Box sx={{ py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip label="Features" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Everything you need to analyze data</Typography>
              <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 500, mx: 'auto' }}>A complete toolkit — from upload to insight in minutes.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <Reveal delay={(i % 3) + 1}>
                  <Card sx={{ height: '100%', border: '1px solid #f1f5f9', transition: 'all .3s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 40px rgba(108,58,255,.08)' } }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Box sx={{ width: 52, height: 52, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ede9fe', color: '#6C3AFF', mb: 2.5 }}>{f.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.05rem' }}>{f.title}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ── */}
      <Box sx={{ py: { xs: 8, md: 14 }, background: '#fafbfc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip label="How It Works" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Three steps to smarter decisions</Typography>
              <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 460, mx: 'auto' }}>No setup, no code. Just upload and ask.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={5}>
            {steps.map((s, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', boxShadow: '0 2px 12px rgba(108,58,255,.08)', border: '1px solid #f1f5f9', position: 'relative' }}>
                      <Box sx={{ color: '#6C3AFF' }}>{s.icon}</Box>
                      <Box sx={{ position: 'absolute', top: -4, right: -4, width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 800, color: '#fff' }}>{s.n}</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{s.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7, maxWidth: 280, mx: 'auto' }}>{s.desc}</Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── STATS ── */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Grid container spacing={4}>
              {stats.map((s, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <Box textAlign="center">
                    <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: .5 }}>{s.n}</Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, fontSize: '.75rem' }}>{s.l}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Reveal>
        </Container>
      </Box>

      {/* ── TESTIMONIALS ── */}
      <Box sx={{ py: { xs: 8, md: 14 }, background: '#fafbfc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip label="Testimonials" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Loved by data teams</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Card sx={{ height: '100%', border: '1px solid #f1f5f9', transition: 'all .3s ease', '&:hover': { boxShadow: '0 8px 30px rgba(108,58,255,.06)' } }}>
                    <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Stack direction="row" spacing={.5} sx={{ mb: 2 }}>{[...Array(5)].map((_, j) => <Box key={j} sx={{ color: '#f59e0b', fontSize: 16 }}>★</Box>)}</Stack>
                      <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8, flexGrow: 1, mb: 3 }}>"{t.text}"</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, fontSize: '.85rem' }}>{t.a}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '.85rem', lineHeight: 1.3 }}>{t.name}</Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>{t.role}</Typography>
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

      {/* ── FAQ ── */}
      <Box sx={{ py: { xs: 8, md: 14 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 6 }}>
              <Chip label="FAQ" size="small" sx={{ mb: 2, background: '#ede9fe', color: '#6C3AFF', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>Frequently asked questions</Typography>
            </Box>
          </Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={1}>
              <Accordion expanded={faq === i} onChange={(_, x) => setFaq(x ? i : false)} sx={{ background: '#fff !important', border: '1px solid #f1f5f9 !important', borderRadius: '14px !important', mb: 1.5, '&:before': { display: 'none' }, '&.Mui-expanded': { border: '1px solid #e2e8f0 !important', boxShadow: '0 2px 12px rgba(0,0,0,.04) !important' } }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#94a3b8' }} />} sx={{ px: 3, py: .5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8 }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: '#fafbfc', borderTop: '1px solid #f1f5f9' }}>
        <Container maxWidth="sm">
          <Reveal>
            <Box textAlign="center">
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>Ready to get started?</Typography>
              <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>Join thousands of teams making smarter decisions with AnalytIQ.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button component={Link} to="/signup" variant="contained" size="large" endIcon={<ArrowForward />} sx={{ py: 1.5, px: 4, fontSize: '1rem' }}>Start Free</Button>
                <Button component={Link} to="/contact" variant="outlined" size="large" sx={{ py: 1.5, px: 4, fontSize: '1rem' }}>Talk to Sales</Button>
              </Stack>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};
export default Home;
