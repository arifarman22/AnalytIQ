import React from 'react';

const PromptBox = ({ prompt, onPromptChange, onAnalyze, loading, columns, datasetId }) => {
  const examplePrompts = [
    "What are the key trends and patterns in this dataset?",
    "Identify any correlations between numerical features",
    "What insights can you provide about categorical variables?",
    "Are there any outliers or anomalies in the data?",
    "Suggest some interesting visualizations for this data",
    "Perform comprehensive exploratory data analysis",
    "Check for data quality issues and suggest improvements",
    "Analyze relationships between categorical and numerical variables"
  ];

  const handlePromptSelect = (examplePrompt) => {
    onPromptChange(examplePrompt);
  };

  return (
    <div className="prompt-box">
      <h2>Analyze Your Data</h2>
      
      {datasetId && (
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f0f9ff', borderRadius: '4px' }}>
          <p><strong>Dataset ID:</strong> {datasetId}</p>
        </div>
      )}
      
      {columns && columns.length > 0 && (
        <div>
          <p><strong>Available columns:</strong></p>
          <div className="column-list">
            {columns.map((col, index) => (
              <span key={index} className="column-pill">{col}</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="prompt-input">
          <h3>Enter your analysis question:</h3>
        </label>
        <textarea
          id="prompt-input"
          className="prompt-textarea"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g., What are the key trends in this data? Are there any correlations between variables? Perform comprehensive EDA."
          rows={4}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p><strong>Example prompts:</strong></p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(example)}
              style={{
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                backgroundColor: '#f7fafc',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onAnalyze} 
        disabled={loading || !prompt.trim() || !datasetId}
        className="analyze-btn"
      >
        {loading && <span className="loading-spinner"></span>}
        {loading ? 'Analyzing...' : 'Analyze Data'}
      </button>
    </div>
  );
};

export default PromptBox;