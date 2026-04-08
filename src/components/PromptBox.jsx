import React from 'react';

const PromptBox = ({ prompt, onPromptChange, onAnalyze, loading, columns, datasetId }) => {
  const examples = [
    "What are the key trends and patterns?",
    "Identify correlations between features",
    "Insights about categorical variables?",
    "Any outliers or anomalies?",
    "Suggest visualizations for this data",
    "Comprehensive exploratory data analysis",
    "Check for data quality issues",
    "Categorical vs numerical relationships"
  ];

  return (
    <div className="prompt-box">
      <h2>Analyze Your Data</h2>
      {datasetId && (
        <div style={{ marginBottom: '1rem', padding: '.6rem 1rem', background: '#ede9fe', borderRadius: 10, fontSize: '.85rem', color: '#64748b' }}>
          <strong style={{ color: '#6C3AFF' }}>Dataset:</strong> {datasetId}
        </div>
      )}
      {columns?.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#64748b', marginBottom: '.5rem' }}>Available columns:</p>
          <div className="column-list">{columns.map((c, i) => <span key={i} className="column-pill">{c}</span>)}</div>
        </div>
      )}
      <div>
        <h3>Enter your analysis question:</h3>
        <textarea className="prompt-textarea" value={prompt} onChange={e => onPromptChange(e.target.value)} placeholder="e.g., What are the key trends? Any correlations?" rows={4} />
      </div>
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#64748b', marginBottom: '.5rem' }}>Quick prompts:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => onPromptChange(ex)} style={{
              padding: '.4rem .75rem', border: '1px solid #e2e8f0', borderRadius: 50, background: '#fff', color: '#64748b',
              cursor: 'pointer', fontSize: '.8rem', fontFamily: 'Inter,sans-serif', transition: 'all .2s ease',
            }}
              onMouseEnter={e => { e.target.style.borderColor = '#c4b5fd'; e.target.style.color = '#6C3AFF'; e.target.style.background = '#ede9fe'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#64748b'; e.target.style.background = '#fff'; }}
            >{ex}</button>
          ))}
        </div>
      </div>
      <button onClick={onAnalyze} disabled={loading || !prompt.trim() || !datasetId} className="analyze-btn">
        {loading && <span className="loading-spinner" />}{loading ? 'Analyzing...' : 'Analyze Data'}
      </button>
    </div>
  );
};
export default PromptBox;
