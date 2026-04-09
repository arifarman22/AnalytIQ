import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthProvider, useAuth } from './context/AuthContext';
import FileUploader from './components/FileUploader';
import PromptBox from './components/PromptBox';
import AnalysisResults from './components/AnalysisResults';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Settings from './components/Settings';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AnalysisHistory from './components/AnalysisHistory';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import './styles.css';
import api from './utils/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6C3AFF', dark: '#5529cc', light: '#a78bfa' },
    secondary: { main: '#a855f7' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
    divider: '#e2e8f0',
    success: { main: '#16a34a' },
    error: { main: '#dc2626' },
    warning: { main: '#f59e0b' },
  },
  typography: {
    fontFamily: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: '#fff' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 20, backgroundImage: 'none', boxShadow: '0 1px 3px rgba(0,0,0,.04),0 4px 24px rgba(0,0,0,.06)', border: 'none' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 50, textTransform: 'none', fontWeight: 600, padding: '10px 24px' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [datasetId, setDatasetId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const step = !datasetId ? 0 : !analysisResult ? 1 : 2;
  const steps = ['Upload', 'Analyze', 'Results'];

  const handleFileChange = (f) => { setFile(f); setError(null); };
  const handleUpload = async () => {
    if (!file) { setError('Please select a file first'); return; }
    setLoading(true); setError(null);
    const fd = new FormData(); fd.append('file', file);
    try { const r = await api.post('/datasets/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); setUploadResponse(r.data); setDatasetId(r.data.dataset_id); }
    catch (e) { setError(e.response?.data?.detail || 'Failed to upload'); }
    finally { setLoading(false); }
  };
  const handleAnalyze = async () => {
    if (!datasetId) { setError('Upload a dataset first'); return; }
    if (!prompt.trim()) { setError('Enter an analysis prompt'); return; }
    setLoading(true); setError(null);
    try { const r = await api.post('/analyses/', { dataset_id: datasetId, prompt }); setAnalysisResult(r.data); }
    catch (e) { setError(e.response?.data?.detail || 'Analysis failed'); }
    finally { setLoading(false); }
  };
  const resetAll = () => { setFile(null); setDatasetId(null); setPrompt(''); setAnalysisResult(null); setUploadResponse(null); setError(null); };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', background: '#fafbfc' }}>
      {/* Dashboard Header */}
      <Box sx={{ background: '#fff', borderBottom: '1px solid #f1f5f9', py: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Upload a dataset and let AI analyze it for you</Typography>
            </Box>
            {datasetId && (
              <Button variant="outlined" size="small" onClick={resetAll} sx={{ borderColor: '#fecaca', color: '#dc2626', '&:hover': { background: '#fef2f2', borderColor: '#fca5a5' } }}>
                ✕ New Analysis
              </Button>
            )}
          </Box>
          {/* Stepper */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: .75 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700,
                    background: i <= step ? 'linear-gradient(135deg,#6C3AFF,#a855f7)' : '#f1f5f9', color: i <= step ? '#fff' : '#94a3b8',
                    transition: 'all .3s ease' }}>
                    {i < step ? '✓' : i + 1}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: i <= step ? '#0f172a' : '#94a3b8', display: { xs: 'none', sm: 'block' } }}>{s}</Typography>
                </Box>
                {i < steps.length - 1 && <Box sx={{ flex: 1, height: 2, background: i < step ? '#6C3AFF' : '#e2e8f0', borderRadius: 1, transition: 'all .3s ease', maxWidth: 80 }} />}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: 4 }}>
        {error && (
          <Box sx={{ background: '#fef2f2', color: '#dc2626', p: '12px 16px', borderRadius: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #fecaca', fontSize: '.9rem' }}>
            {error}
            <Box component="button" onClick={() => setError(null)} sx={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#dc2626', ml: 2 }}>×</Box>
          </Box>
        )}

        {step === 0 && (
          <FileUploader file={file} onFileChange={handleFileChange} onUpload={handleUpload} loading={loading} />
        )}

        {step >= 1 && !analysisResult && (
          <>
            {/* Dataset summary card */}
            <Box sx={{ background: '#fff', borderRadius: 4, border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,.04)', p: 2.5, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 3, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✓</Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{uploadResponse?.filename}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>{uploadResponse?.rows?.toLocaleString()} rows × {uploadResponse?.cols} columns · {(uploadResponse?.file_size_bytes / 1024).toFixed(1)} KB</Typography>
              </Box>
            </Box>
            <PromptBox prompt={prompt} onPromptChange={setPrompt} onAnalyze={handleAnalyze} loading={loading} columns={uploadResponse?.columns || []} datasetId={datasetId} />
          </>
        )}

        {analysisResult && <AnalysisResults analysisResult={analysisResult} datasetId={datasetId} />}
      </Box>
    </Box>
  );
}

function AppRoutes() {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar user={user} onLogout={logout} />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><AnalysisHistory /></ProtectedRoute>} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
      setTimeout(() => setSplash(false), 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {splash && <SplashScreen visible={splashVisible} />}
      <AuthProvider>
        <Router><AppRoutes /></Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
