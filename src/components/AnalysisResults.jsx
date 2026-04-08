import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableRow, TableHead, Paper, Chip, Divider, Stack, Box } from '@mui/material';

const Section = ({ title, children }) => (
  <Card sx={{ mb: 2, border: '1px solid #f1f5f9' }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem', color: '#6C3AFF' }}>{title}</Typography>
      {children}
    </CardContent>
  </Card>
);

const AnalysisResults = ({ analysisResult, datasetId }) => {
  if (!analysisResult) return null;
  const { eda } = analysisResult;

  const renderDatasetInfo = () => { if (!eda?.dataset_info) return null; const i = eda.dataset_info; return <Section title="Dataset Overview"><Table size="small"><TableBody><TableRow><TableCell>Rows</TableCell><TableCell>{i.rows}</TableCell></TableRow><TableRow><TableCell>Columns</TableCell><TableCell>{i.columns}</TableCell></TableRow><TableRow><TableCell>Memory</TableCell><TableCell>{i.total_memory_bytes} bytes</TableCell></TableRow><TableRow><TableCell>Duplicates</TableCell><TableCell>{i.duplicate_rows} ({i.duplicate_percentage}%)</TableCell></TableRow></TableBody></Table></Section>; };
  const renderDtypes = () => { if (!eda?.dtypes) return null; return <Section title="Column Types"><Table size="small"><TableHead><TableRow><TableCell>Column</TableCell><TableCell>Type</TableCell></TableRow></TableHead><TableBody>{Object.entries(eda.dtypes).map(([c, d]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{d}</TableCell></TableRow>)}</TableBody></Table></Section>; };
  const renderSummaryStats = () => { if (!eda?.numeric_analysis?.summary_stats) return null; const s = eda.numeric_analysis.summary_stats; return <Section title="Summary Statistics"><Box sx={{ overflowX: 'auto' }}><Table size="small"><TableHead><TableRow><TableCell>Stat</TableCell>{Object.keys(s).map(c => <TableCell key={c}>{c}</TableCell>)}</TableRow></TableHead><TableBody>{Object.keys(s[Object.keys(s)[0]]).map(st => <TableRow key={st}><TableCell>{st}</TableCell>{Object.keys(s).map(c => <TableCell key={c + st}>{s[c][st]}</TableCell>)}</TableRow>)}</TableBody></Table></Box></Section>; };
  const renderMissing = () => { if (!eda?.missing_values?.count) return null; return <Section title="Missing Values"><Table size="small"><TableHead><TableRow><TableCell>Column</TableCell><TableCell>Count</TableCell><TableCell>%</TableCell></TableRow></TableHead><TableBody>{Object.keys(eda.missing_values.count).map(c => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{eda.missing_values.count[c]}</TableCell><TableCell>{eda.missing_values.percentage[c]}%</TableCell></TableRow>)}</TableBody></Table></Section>; };
  const renderCorr = () => { if (!eda?.correlation_analysis?.highly_correlated_pairs?.length) return null; return <Section title="Highly Correlated Pairs"><Table size="small"><TableHead><TableRow><TableCell>Feature 1</TableCell><TableCell>Feature 2</TableCell><TableCell>r</TableCell></TableRow></TableHead><TableBody>{eda.correlation_analysis.highly_correlated_pairs.map((p, i) => <TableRow key={i}><TableCell>{p.feature1}</TableCell><TableCell>{p.feature2}</TableCell><TableCell>{p.correlation}</TableCell></TableRow>)}</TableBody></Table></Section>; };

  const renderNumericExtras = () => {
    if (!eda?.numeric_analysis) return null;
    const { skewness, kurtosis, outliers_iqr, normality_tests } = eda.numeric_analysis;
    return <Grid container spacing={2} sx={{ mb: 2 }}>
      {skewness && <Grid item xs={12} md={6}><Section title="Skewness"><Table size="small"><TableBody>{Object.entries(skewness).map(([c, v]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{v}</TableCell></TableRow>)}</TableBody></Table></Section></Grid>}
      {kurtosis && <Grid item xs={12} md={6}><Section title="Kurtosis"><Table size="small"><TableBody>{Object.entries(kurtosis).map(([c, v]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{v}</TableCell></TableRow>)}</TableBody></Table></Section></Grid>}
      {outliers_iqr && <Grid item xs={12} md={6}><Section title="Outliers (IQR)"><Table size="small"><TableHead><TableRow><TableCell>Col</TableCell><TableCell>Count</TableCell><TableCell>%</TableCell></TableRow></TableHead><TableBody>{Object.entries(outliers_iqr).map(([c, s]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{s.count}</TableCell><TableCell>{s.percentage}%</TableCell></TableRow>)}</TableBody></Table></Section></Grid>}
      {normality_tests && Object.keys(normality_tests).length > 0 && <Grid item xs={12}><Section title="Normality Tests"><Table size="small"><TableHead><TableRow><TableCell>Col</TableCell><TableCell>Shapiro p</TableCell><TableCell>D'Agostino p</TableCell></TableRow></TableHead><TableBody>{Object.entries(normality_tests).map(([c, t]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{t?.shapiro_wilk?.p_value ?? '-'}</TableCell><TableCell>{t?.dagostino_k2?.p_value ?? '-'}</TableCell></TableRow>)}</TableBody></Table></Section></Grid>}
    </Grid>;
  };

  const renderCategorical = () => {
    if (!eda?.categorical_analysis) return null;
    const { value_counts, unique_values, entropy } = eda.categorical_analysis;
    return <Section title="Categorical Analysis"><Grid container spacing={2}>
      <Grid item xs={12} md={6}><Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>Top Values</Typography><Table size="small"><TableHead><TableRow><TableCell>Col</TableCell><TableCell>Value</TableCell><TableCell>Count</TableCell></TableRow></TableHead><TableBody>{Object.entries(value_counts).flatMap(([c, cs]) => Object.entries(cs).map(([v, n]) => <TableRow key={`${c}-${v}`}><TableCell>{c}</TableCell><TableCell>{v}</TableCell><TableCell>{n}</TableCell></TableRow>))}</TableBody></Table></Grid>
      <Grid item xs={12} md={6}><Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>Unique & Entropy</Typography><Table size="small"><TableHead><TableRow><TableCell>Col</TableCell><TableCell>Unique</TableCell><TableCell>Entropy</TableCell></TableRow></TableHead><TableBody>{Object.keys(unique_values).map(c => <TableRow key={c}><TableCell>{c}</TableCell><TableCell>{unique_values[c]}</TableCell><TableCell>{entropy[c]?.toFixed(3)}</TableCell></TableRow>)}</TableBody></Table></Grid>
    </Grid></Section>;
  };

  const renderCatNum = () => { const r = eda?.categorical_numeric_relationships; if (!r || !Object.keys(r).length) return null; return <Section title="ANOVA Relationships"><Table size="small"><TableHead><TableRow><TableCell>Cat</TableCell><TableCell>Num</TableCell><TableCell>F</TableCell><TableCell>p</TableCell></TableRow></TableHead><TableBody>{Object.entries(r).flatMap(([c, ns]) => Object.entries(ns).map(([n, s]) => <TableRow key={`${c}-${n}`}><TableCell>{c}</TableCell><TableCell>{n}</TableCell><TableCell>{s.anova_f_stat?.toFixed(3)}</TableCell><TableCell>{s.anova_p_value?.toFixed(3)}</TableCell></TableRow>))}</TableBody></Table></Section>; };

  const renderMulti = () => { const m = eda?.multivariate_analysis; if (!m) return null; return <Section title="Multivariate Readiness"><Chip label={`PCA: ${m.suitable_for_pca ? 'Yes' : 'No'}`} size="small" sx={{ mb: 2, background: m.suitable_for_pca ? '#dcfce7' : '#f1f5f9', color: m.suitable_for_pca ? '#16a34a' : '#64748b' }} /></Section>; };

  return (
    <div className="analysis-results">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: .5 }}>Analysis Results</Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Dataset: {datasetId}</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {analysisResult.llm?.executive_summary && <Section title="Executive Summary"><Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8 }}>{analysisResult.llm.executive_summary}</Typography></Section>}
      {analysisResult.llm?.key_findings && <Section title="Key Findings"><ul style={{ paddingLeft: '1.2em', margin: 0 }}>{analysisResult.llm.key_findings.map((f, i) => <li key={i} style={{ color: '#64748b', marginBottom: '.5rem', lineHeight: 1.7 }}>{f}</li>)}</ul></Section>}
      {renderDatasetInfo()}{renderDtypes()}{renderSummaryStats()}{renderMissing()}{renderCorr()}{renderNumericExtras()}{renderCategorical()}{renderCatNum()}{renderMulti()}
      {analysisResult.plots?.length > 0 && <Section title="Visualizations"><Grid container spacing={2}>{analysisResult.plots.map((p, i) => <Grid item xs={12} sm={6} md={4} key={i}><Paper sx={{ p: 1.5, border: '1px solid #f1f5f9' }}><Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{p.name}</Typography>{p.mime === 'text/html' ? <iframe srcDoc={atob(p.b64)} title={p.name} style={{ width: '100%', height: 400, border: 'none', borderRadius: 8, marginTop: 8 }} sandbox="allow-scripts allow-same-origin" /> : <img src={`data:${p.mime};base64,${p.b64}`} alt={p.name} style={{ width: '100%', borderRadius: 8, marginTop: 8 }} />}</Paper></Grid>)}</Grid></Section>}
      {analysisResult.llm?.next_steps && <Section title="Next Steps"><ul style={{ paddingLeft: '1.2em', margin: 0 }}>{analysisResult.llm.next_steps.map((s, i) => <li key={i} style={{ color: '#64748b', marginBottom: '.5rem', lineHeight: 1.7 }}>{s}</li>)}</ul></Section>}
    </div>
  );
};
export default AnalysisResults;
