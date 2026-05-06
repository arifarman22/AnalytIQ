import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    if (!file) { setError('Select a file first'); return; }
    setLoading(true); setError(null);
    const fd = new FormData(); fd.append('file', file);
    try { const r = await api.post('/datasets/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); setUploadResponse(r.data); setDatasetId(r.data.dataset_id); }
    catch (e) { setError(e.safeMessage || 'Upload failed'); }
    finally { setLoading(false); }
  };
  const handleAnalyze = async () => {
    if (!prompt.trim()) { setError('Enter a prompt'); return; }
    setLoading(true); setError(null);
    try { const r = await api.post('/analyses/', { dataset_id: datasetId, prompt }); setAnalysisResult(r.data); }
    catch (e) { setError(e.safeMessage || 'Analysis failed'); }
    finally { setLoading(false); }
  };
  const resetAll = () => { setFile(null); setDatasetId(null); setPrompt(''); setAnalysisResult(null); setUploadResponse(null); setError(null); };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <Box sx={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,.04)', py: 2.5 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: '.82rem', fontWeight: 300 }}>Upload a dataset and let AI analyze it</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Stepper */}
            {steps.map((s, i) => (
              <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                <Box sx={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 500,
                  background: i <= step ? '#E50914' : 'rgba(255,255,255,.04)', color: i <= step ? '#fff' : '#6b7280', transition: 'all .3s ease' }}>
                  {i < step ? '✓' : i + 1}
                </Box>
                <Typography sx={{ fontSize: '.75rem', color: i <= step ? '#EAEAEA' : '#6b7280', display: { xs: 'none', sm: 'block' }, fontWeight: 400 }}>{s}</Typography>
                {i < steps.length - 1 && <Box sx={{ width: 20, height: 1, background: i < step ? '#E50914' : 'rgba(255,255,255,.06)', mx: .5 }} />}
              </Box>
            ))}
            {datasetId && <Button size="small" onClick={resetAll} sx={{ color: '#9ca3af', fontSize: '.78rem', '&:hover': { color: '#E50914' } }}>Reset</Button>}
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: 4, width: '100%' }}>
        {error && (
          <Box className="fade-in" sx={{ background: 'rgba(229,9,20,.06)', color: '#E50914', p: '10px 16px', borderRadius: '10px', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(229,9,20,.15)', fontSize: '.85rem', fontWeight: 400 }}>
            {error}
            <Box component="button" onClick={() => setError(null)} sx={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#E50914' }}>×</Box>
          </Box>
        )}

        {step === 0 && <FileUploader file={file} onFileChange={handleFileChange} onUpload={handleUpload} loading={loading} />}

        {step >= 1 && !analysisResult && (
          <>
            <Box className="fade-in" sx={{ background: 'rgba(255,255,255,.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,.04)', p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '8px', background: 'rgba(34,197,94,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: '.9rem' }}>✓</Box>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '.88rem' }}>{uploadResponse?.filename}</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '.78rem', fontWeight: 300 }}>{uploadResponse?.rows?.toLocaleString()} rows × {uploadResponse?.cols} cols</Typography>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
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
    const timer = setTimeout(() => { setSplashVisible(false); setTimeout(() => setSplash(false), 500); }, 2000);
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
