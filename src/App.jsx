import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
  const [file, setFile] = useState(null);
  const [datasetId, setDatasetId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="dashboard-container">
      <main className="app-main">
        {error && <div className="error-message">{error}<button onClick={() => setError(null)} className="dismiss-btn">×</button></div>}
        {!datasetId ? (
          <FileUploader file={file} onFileChange={handleFileChange} onUpload={handleUpload} loading={loading} uploadResponse={uploadResponse} />
        ) : (
          <>
            <div className="upload-success">
              <h3>✓ Dataset Uploaded</h3>
              <p>Filename: {uploadResponse.filename}</p>
              <p>{uploadResponse.rows} rows × {uploadResponse.cols} columns</p>
              <button onClick={resetAll} className="reset-btn">Upload Different File</button>
            </div>
            <PromptBox prompt={prompt} onPromptChange={setPrompt} onAnalyze={handleAnalyze} loading={loading} columns={uploadResponse?.columns || []} datasetId={datasetId} />
            {analysisResult && <AnalysisResults analysisResult={analysisResult} datasetId={datasetId} />}
          </>
        )}
      </main>
    </div>
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router><AppRoutes /></Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
