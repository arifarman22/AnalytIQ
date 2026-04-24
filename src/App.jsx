import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeModeProvider } from './context/ThemeContext';
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

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const { user } = useAuth();
  const t = useTheme();
  const c = t.palette.custom;
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
    catch (e) { setError(e.safeMessage || 'Failed to upload'); }
    finally { setLoading(false); }
  };
  const handleAnalyze = async () => {
    if (!datasetId) { setError('Upload a dataset first'); return; }
    if (!prompt.trim()) { setError('Enter an analysis prompt'); return; }
    setLoading(true); setError(null);
    try { const r = await api.post('/analyses/', { dataset_id: datasetId, prompt }); setAnalysisResult(r.data); }
    catch (e) { setError(e.safeMessage || 'Analysis failed'); }
    finally { setLoading(false); }
  };
  const resetAll = () => { setFile(null); setDatasetId(null); setPrompt(''); setAnalysisResult(null); setUploadResponse(null); setError(null); };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', background: c.bg, transition: 'background .3s ease' }}>
      <Box sx={{ background: c.card, borderBottom: `1px solid ${c.border}`, py: 3, transition: 'all .3s ease' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Upload a dataset and let AI analyze it for you</Typography>
            </Box>
            {datasetId && (
              <Button variant="outlined" size="small" onClick={resetAll} sx={{ borderColor: '#fecaca', color: '#dc2626', '&:hover': { background: 'rgba(220,38,38,.08)', borderColor: '#fca5a5' } }}>
                ✕ New Analysis
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: .75 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700,
                    background: i <= step ? 'linear-gradient(135deg,#6C3AFF,#a855f7)' : c.bgMuted, color: i <= step ? '#fff' : 'text.secondary',
                    transition: 'all .4s ease', boxShadow: i <= step ? '0 2px 12px rgba(108,58,255,.3)' : 'none' }}>
                    {i < step ? '✓' : i + 1}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: i <= step ? 'text.primary' : 'text.secondary', display: { xs: 'none', sm: 'block' }, transition: 'color .3s ease' }}>{s}</Typography>
                </Box>
                {i < steps.length - 1 && <Box sx={{ flex: 1, height: 2, background: i < step ? '#6C3AFF' : c.border, borderRadius: 1, transition: 'all .4s ease', maxWidth: 80 }} />}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: 4 }}>
        {error && (
          <Box className="fade-in" sx={{ background: t.palette.mode === 'dark' ? 'rgba(220,38,38,.12)' : '#fef2f2', color: '#dc2626', p: '12px 16px', borderRadius: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(220,38,38,.2)', fontSize: '.9rem' }}>
            {error}
            <Box component="button" onClick={() => setError(null)} sx={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#dc2626', ml: 2 }}>×</Box>
          </Box>
        )}
        {step === 0 && <FileUploader file={file} onFileChange={handleFileChange} onUpload={handleUpload} loading={loading} />}
        {step >= 1 && !analysisResult && (
          <>
            <Box className="fade-in" sx={{ background: c.card, borderRadius: 4, border: `1px solid ${c.borderLight}`, boxShadow: c.shadow, p: 2.5, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', transition: 'all .3s ease' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 3, background: 'rgba(22,163,106,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✓</Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{uploadResponse?.filename}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{uploadResponse?.rows?.toLocaleString()} rows × {uploadResponse?.cols} columns · {(uploadResponse?.file_size_bytes / 1024).toFixed(1)} KB</Typography>
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
      <Box sx={{ flex: 1, width: '100%' }}>
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
    <ThemeModeProvider>
      {splash && <SplashScreen visible={splashVisible} />}
      <AuthProvider>
        <Router><AppRoutes /></Router>
      </AuthProvider>
    </ThemeModeProvider>
  );
}
