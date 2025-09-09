// App main file
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FileUploader from './components/FileUploader';
import PromptBox from './components/PromptBox';
import AnalysisResults from './components/AnalysisResults';
import Login from './components/Login';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import './styles.css';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#651fff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
    divider: '#424242',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function Dashboard({ user }) {
  const [file, setFile] = useState(null);
  const [datasetId, setDatasetId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadResponse(response.data);
      setDatasetId(response.data.dataset_id);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!datasetId) {
      setError('Please upload a dataset first');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter an analysis prompt');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API}/analyze`, {
        dataset_id: datasetId,
        prompt: prompt,
      });
      setAnalysisResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze dataset');
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setDatasetId(null);
    setPrompt('');
    setAnalysisResult(null);
    setUploadResponse(null);
    setError(null);
  };

  return (
    <div className="dashboard-container">
      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="dismiss-btn">×</button>
          </div>
        )}
        {!datasetId ? (
          <FileUploader
            file={file}
            onFileChange={handleFileChange}
            onUpload={handleUpload}
            loading={loading}
            uploadResponse={uploadResponse}
          />
        ) : (
          <>
            <div className="upload-success">
              <h3>✓ Dataset Uploaded Successfully</h3>
              <p>Filename: {uploadResponse.filename}</p>
              <p>Dimensions: {uploadResponse.rows} rows × {uploadResponse.cols} columns</p>
              <button onClick={resetAll} className="reset-btn">
                Upload Different File
              </button>
            </div>
            <PromptBox
              prompt={prompt}
              onPromptChange={setPrompt}
              onAnalyze={handleAnalyze}
              loading={loading}
              columns={uploadResponse?.columns || []}
              datasetId={datasetId}
            />
            {analysisResult && (
              <AnalysisResults
                analysisResult={analysisResult}
                datasetId={datasetId}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}