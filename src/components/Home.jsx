import React, { useState } from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Analytics, ShowChart, AutoAwesome, Security, Dashboard, IntegrationInstructions, ArrowForward, ExpandMore, CloudUpload, Psychology, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0 }) => {
  const [ref, vis] = useScrollReveal(0.1);
  return <div ref={ref} className={`reveal ${vis ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}>{children}</div>;
};

const Home = () => {
  const [faq, setFaq] = useState(false);
  const t = useTheme();
  const c = t.palette.custom;
  const dark = t.palette.mode === 'dark';

  const glass = {
    background: dark ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.7)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)'}`,
  };

  const logos = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Ind.', 'Wayne Ent.'];

  const features = [
    { icon: <Analytics sx={{ fontSize: 28 }} />, title: 'Advanced Analytics', desc: 'Statistical analysis and ML algorithms to uncover hidden patterns in your data.' },
    { icon: <ShowChart sx={{ fontSize: 28 }} />, title: 'Interactive Charts', desc: 'Beautiful interactive visualizations powered by Plotly that simplify complex data.' },
    { icon: <AutoAwesome sx={{ fontSize: 28 }} />, title: 'AI Insights', desc: 'GPT-powered AI generates actionable insights and predictive analytics instantly.' },
    { icon: <Security sx={{ fontSize: 28 }} />, title: 'Enterprise Security', desc: 'End-to-end encryption, JWT auth, and industry compliance standards built-in.' },
    { icon: <Dashboard sx={{ fontSize: 28 }} />, title: 'Live Dashboards', desc: 'Real-time monitoring with customizable dashboards and analysis history.' },
    { icon: <IntegrationInstructions sx={{ fontSize: 28 }} />, title: 'API & Integrations', desc: 'RESTful API with full documentation. Connect your existing tools seamlessly.' },
  ];

  const steps = [
    { icon: <CloudUpload sx={{ fontSize: 32 }} />, n: '01', title: 'Upload Data', desc: 'Drag and drop CSV or Excel files. We parse, validate, and store securely.' },
    { icon: <Psychology sx={{ fontSize: 32 }} />, n: '02', title: 'Ask Anything', desc: 'Describe what you want to know in plain English. Our AI understands context.' },
    { icon: <TrendingUp sx={{ fontSize: 32 }} />, n: '03', title: 'Get Results', desc: 'Receive comprehensive EDA, interactive visualizations, and AI recommendations.' },
  ];

  const stats = [
    { n: '10K+', l: 'Active Users' }, { n: '2M+', l: 'Analyses Run' },
    { n: '95%', l: 'Accuracy Rate' }, { n: '<2min', l: 'Avg. Analysis' },
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
    <Box sx={{ width: '100%', overflow: 'hidden' }}>

      {/* ═══ HERO ═══ */}
      <Box sx={{ position: 'relative', pt: { xs: 10, md: 18 }, pb: { xs: 10, md: 16 }, textAlign: 'center' }}>
        {/* Gradient orbs */}
        <Box sx={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: { xs: 500, md: 900 }, height: { xs: 500, md: 900 }, background: 'radial-gradient(circle, rgba(108,58,255,.15) 0%, rgba(168,85,247,.08) 40%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', top: '10%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(168,85,247,.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Chip label="✦  AI-Powered Analytics Platform" sx={{ mb: 4, px: 2, py: 2.5, fontSize: '.85rem', fontWeight: 600, background: dark ? 'rgba(108,58,255,.12)' : '#ede9fe', color: '#a78bfa', border: `1px solid ${dark ? 'rgba(108,58,255,.2)' : 'transparent'}`, borderRadius: '50px' }} />
          </Reveal>
          <Reveal delay={1}>
            <Typography sx={{ fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' }, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', mb: 3, maxWidth: 800, mx: 'auto' }}>
              Turn raw data into{' '}
              <Box component="span" sx={{ background: 'linear-gradient(135deg,#6C3AFF 0%,#a855f7 50%,#6C3AFF 100%)', backgroundSize: '200% 200%', animation: 'shimmer 4s ease-in-out infinite', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                real insights
              </Box>
            </Typography>
          </Reveal>
          <Reveal delay={2}>
            <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', mb: 6, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 400, lineHeight: 1.8 }}>
              Upload any dataset, ask questions in plain English, and get comprehensive analysis with AI-powered recommendations — in seconds.
            </Typography>
          </Reveal>
          <Reveal delay={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Button component={Link} to="/signup" size="large" endIcon={<ArrowForward />} sx={{ py: 1.8, px: 5, fontSize: '1.05rem', fontWeight: 700, borderRadius: '60px', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff', boxShadow: '0 0 30px rgba(108,58,255,.4)', '&:hover': { boxShadow: '0 0 50px rgba(108,58,255,.55)', transform: 'translateY(-3px)' }, transition: 'all .3s ease' }}>
                Start Free
              </Button>
              <Button component={Link} to="/pricing" size="large" sx={{ py: 1.8, px: 5, fontSize: '1.05rem', fontWeight: 600, borderRadius: '60px', border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : '#e2e8f0'}`, color: 'text.primary', '&:hover': { background: dark ? 'rgba(255,255,255,.04)' : '#faf5ff', borderColor: '#a78bfa' }, transition: 'all .3s ease' }}>
                See Pricing
              </Button>
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* ═══ LOGOS ═══ */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 3, mb: 4, fontSize: '.7rem' }}>
              Trusted by data teams worldwide
            </Typography>
            <Stack direction="row" spacing={{ xs: 4, md: 8 }} justifyContent="center" flexWrap="wrap" useFlexGap>
              {logos.map(l => <Typography key={l} sx={{ color: dark ? 'rgba(255,255,255,.15)' : '#cbd5e1', fontWeight: 700, fontSize: { xs: '1rem', md: '1.2rem' }, letterSpacing: 1, transition: 'color .3s', '&:hover': { color: dark ? 'rgba(255,255,255,.4)' : '#94a3b8' } }}>{l}</Typography>)}
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* ═══ FEATURES ═══ */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 10 }}>
              <Chip label="Features" size="small" sx={{ mb: 2, background: dark ? 'rgba(108,58,255,.12)' : '#ede9fe', color: '#a78bfa', fontWeight: 600, border: `1px solid ${dark ? 'rgba(108,58,255,.2)' : 'transparent'}` }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 2 }}>Everything you need to analyze data</Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.7 }}>A complete toolkit — from upload to insight in minutes.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <Reveal delay={(i % 3) + 1}>
                  <Card sx={{ height: '100%', ...glass, borderRadius: '24px', transition: 'all .4s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 60px rgba(108,58,255,.12)', borderColor: dark ? 'rgba(108,58,255,.2)' : 'rgba(108,58,255,.1)' } }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(108,58,255,.15), rgba(168,85,247,.1))', color: '#a78bfa', mb: 3 }}>{f.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.1rem' }}>{f.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ HOW IT WORKS ═══ */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(108,58,255,.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(80px)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Box textAlign="center" sx={{ mb: 10 }}>
              <Chip label="How It Works" size="small" sx={{ mb: 2, background: dark ? 'rgba(108,58,255,.12)' : '#ede9fe', color: '#a78bfa', fontWeight: 600, border: `1px solid ${dark ? 'rgba(108,58,255,.2)' : 'transparent'}` }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 2 }}>Three steps to smarter decisions</Typography>
              <Typography sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto', fontSize: '1.05rem' }}>No setup, no code. Just upload and ask.</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={5}>
            {steps.map((s, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ width: 90, height: 90, mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', ...glass, borderRadius: '50%', position: 'relative', '&:hover': { boxShadow: '0 0 40px rgba(108,58,255,.2)' }, transition: 'all .4s ease' }}>
                      <Box sx={{ color: '#a78bfa' }}>{s.icon}</Box>
                      <Box sx={{ position: 'absolute', top: -2, right: -2, width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 800, color: '#fff', boxShadow: '0 4px 12px rgba(108,58,255,.4)' }}>{s.n}</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>{s.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, maxWidth: 300, mx: 'auto' }}>{s.desc}</Typography>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ STATS ═══ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ ...glass, borderRadius: '24px', p: { xs: 4, md: 6 } }}>
              <Grid container spacing={4}>
                {stats.map((s, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <Box textAlign="center">
                      <Typography sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 800, background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: .5, lineHeight: 1.1 }}>{s.n}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '.7rem' }}>{s.l}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ═══ TESTIMONIALS ═══ */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 10 }}>
              <Chip label="Testimonials" size="small" sx={{ mb: 2, background: dark ? 'rgba(108,58,255,.12)' : '#ede9fe', color: '#a78bfa', fontWeight: 600, border: `1px solid ${dark ? 'rgba(108,58,255,.2)' : 'transparent'}` }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 2 }}>Loved by data teams</Typography>
            </Box>
          </Reveal>
          <Grid container spacing={3}>
            {testimonials.map((tt, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Reveal delay={i + 1}>
                  <Card sx={{ height: '100%', ...glass, borderRadius: '24px', transition: 'all .4s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 60px rgba(108,58,255,.1)' } }}>
                    <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Stack direction="row" spacing={.5} sx={{ mb: 2.5 }}>{[...Array(5)].map((_, j) => <Box key={j} sx={{ color: '#f59e0b', fontSize: 18 }}>★</Box>)}</Stack>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9, flexGrow: 1, mb: 3, fontSize: '.95rem' }}>"{tt.text}"</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 40, height: 40, fontSize: '.9rem', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff' }}>{tt.a}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '.9rem', lineHeight: 1.3 }}>{tt.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{tt.role}</Typography>
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

      {/* ═══ FAQ ═══ */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Chip label="FAQ" size="small" sx={{ mb: 2, background: dark ? 'rgba(108,58,255,.12)' : '#ede9fe', color: '#a78bfa', fontWeight: 600, border: `1px solid ${dark ? 'rgba(108,58,255,.2)' : 'transparent'}` }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 2 }}>Frequently asked questions</Typography>
            </Box>
          </Reveal>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={1}>
              <Accordion expanded={faq === i} onChange={(_, x) => setFaq(x ? i : false)} sx={{ ...glass, borderRadius: '16px !important', mb: 2, '&.Mui-expanded': { boxShadow: '0 8px 30px rgba(108,58,255,.08)' } }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'text.secondary' }} />} sx={{ px: 3, py: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '1.05rem' }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Container>
      </Box>

      {/* ═══ CTA ═══ */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
        <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(circle, rgba(108,58,255,.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(80px)' }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <Box textAlign="center">
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2 }}>Ready to get started?</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5, fontSize: '1.1rem', lineHeight: 1.7 }}>Join thousands of teams making smarter decisions with AnalytIQ.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button component={Link} to="/signup" size="large" endIcon={<ArrowForward />} sx={{ py: 1.8, px: 5, fontSize: '1.05rem', fontWeight: 700, borderRadius: '60px', background: 'linear-gradient(135deg,#6C3AFF,#a855f7)', color: '#fff', boxShadow: '0 0 30px rgba(108,58,255,.4)', '&:hover': { boxShadow: '0 0 50px rgba(108,58,255,.55)', transform: 'translateY(-3px)' }, transition: 'all .3s ease' }}>Start Free</Button>
                <Button component={Link} to="/contact" size="large" sx={{ py: 1.8, px: 5, fontSize: '1.05rem', fontWeight: 600, borderRadius: '60px', border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : '#e2e8f0'}`, color: 'text.primary', '&:hover': { background: dark ? 'rgba(255,255,255,.04)' : '#faf5ff', borderColor: '#a78bfa' }, transition: 'all .3s ease' }}>Talk to Sales</Button>
              </Stack>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </Box>
  );
};
export default Home;
