import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableRow, TableHead, Paper, Chip, Divider, Stack, Box, Tabs, Tab, Tooltip, IconButton } from '@mui/material';
import { Assessment, TableChart, BarChart, BubbleChart, Category, Science, AutoAwesome, Lightbulb, TrendingUp, DataObject, WarningAmber, CheckCircle, ContentCopy } from '@mui/icons-material';

/* ── Helpers ── */
const fmt = v => (typeof v === 'number' ? (Number.isInteger(v) ? v.toLocaleString() : v.toFixed(3)) : v ?? '—');

const Section = ({ icon, title, children, accent }) => (
  <Card sx={{ mb: 2.5, border: '1px solid #f1f5f9', overflow: 'visible' }}>
    <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: accent || '#ede9fe', flexShrink: 0 }}>
          {icon}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '.95rem' }}>{title}</Typography>
      </Stack>
      {children}
    </CardContent>
  </Card>
);

const MetricCard = ({ label, value, sub, color = '#6C3AFF' }) => (
  <Box sx={{ p: 2, borderRadius: 3, background: '#fafbfc', border: '1px solid #f1f5f9', textAlign: 'center', transition: 'all .2s', '&:hover': { borderColor: '#e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.04)' } }}>
    <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color, lineHeight: 1.2 }}>{value}</Typography>
    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mt: .25 }}>{label}</Typography>
    {sub && <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '.7rem' }}>{sub}</Typography>}
  </Box>
);

const StyledTable = ({ heads, rows }) => (
  <Box sx={{ overflowX: 'auto' }}>
    <Table size="small">
      {heads && <TableHead><TableRow>{heads.map((h, i) => <TableCell key={i}>{h}</TableCell>)}</TableRow></TableHead>}
      <TableBody>{rows}</TableBody>
    </Table>
  </Box>
);

/* ── Main Component ── */
const AnalysisResults = ({ analysisResult, datasetId }) => {
  const [tab, setTab] = useState(0);
  if (!analysisResult) return null;
  const { eda, plots, insights, llm } = analysisResult;
  const info = eda?.dataset_info;

  /* ── Tab panels ── */
  const hasAI = llm?.executive_summary || llm?.key_findings;
  const hasStats = eda?.numeric_analysis || eda?.categorical_analysis;
  const hasPlots = plots?.length > 0;

  const tabs = [
    { label: 'Overview', icon: <Assessment sx={{ fontSize: 18 }} /> },
    ...(hasAI ? [{ label: 'AI Insights', icon: <AutoAwesome sx={{ fontSize: 18 }} /> }] : []),
    ...(hasStats ? [{ label: 'Statistics', icon: <TableChart sx={{ fontSize: 18 }} /> }] : []),
    ...(hasPlots ? [{ label: 'Visualizations', icon: <BarChart sx={{ fontSize: 18 }} /> }] : []),
  ];

  const tabIndex = (name) => tabs.findIndex(t => t.label === name);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>Analysis Results</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Dataset ID: {datasetId}</Typography>
          </Box>
          <Chip label={`${info?.rows?.toLocaleString() || '—'} rows × ${info?.columns || '—'} cols`} size="small" sx={{ fontWeight: 600 }} />
        </Stack>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #f1f5f9', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          {tabs.map((t, i) => <Tab key={i} label={t.label} icon={t.icon} iconPosition="start" sx={{ minHeight: 48, textTransform: 'none', fontWeight: 600, fontSize: '.85rem' }} />)}
        </Tabs>
      </Box>

      {/* ═══ OVERVIEW TAB ═══ */}
      {tabs[tab]?.label === 'Overview' && (
        <>
          {/* Metric cards */}
          {info && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}><MetricCard label="Rows" value={info.rows?.toLocaleString()} /></Grid>
              <Grid item xs={6} sm={3}><MetricCard label="Columns" value={info.columns} color="#a855f7" /></Grid>
              <Grid item xs={6} sm={3}><MetricCard label="Duplicates" value={`${info.duplicate_percentage}%`} sub={`${info.duplicate_rows} rows`} color={info.duplicate_percentage > 5 ? '#f59e0b' : '#16a34a'} /></Grid>
              <Grid item xs={6} sm={3}><MetricCard label="Memory" value={`${(info.total_memory_bytes / 1024 / 1024).toFixed(1)} MB`} color="#64748b" /></Grid>
            </Grid>
          )}

          {/* Missing values summary */}
          {eda?.missing_values?.total_missing > 0 && (
            <Section icon={<WarningAmber sx={{ fontSize: 18, color: '#f59e0b' }} />} title="Missing Values" accent="#fef9c3">
              <Grid container spacing={1.5}>
                {Object.entries(eda.missing_values.count).filter(([, v]) => v > 0).map(([col, count]) => (
                  <Grid item xs={6} sm={4} md={3} key={col}>
                    <Box sx={{ p: 1.5, borderRadius: 2, background: '#fffbeb', border: '1px solid #fef3c7' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400e', display: 'block' }}>{col}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#f59e0b' }}>{count} <Typography component="span" variant="caption" sx={{ color: '#94a3b8' }}>({eda.missing_values.percentage[col]}%)</Typography></Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Section>
          )}

          {/* Column types */}
          {eda?.dtypes && (
            <Section icon={<DataObject sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Column Types">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .75 }}>
                {Object.entries(eda.dtypes).map(([col, dtype]) => (
                  <Chip key={col} label={`${col}: ${dtype}`} size="small" variant="outlined"
                    sx={{ borderColor: dtype.includes('int') || dtype.includes('float') ? '#c4b5fd' : dtype.includes('object') ? '#fde68a' : '#e2e8f0',
                      color: '#64748b', fontSize: '.75rem' }}
                  />
                ))}
              </Box>
            </Section>
          )}

          {/* Correlation highlights */}
          {eda?.correlation_analysis?.highly_correlated_pairs?.length > 0 && (
            <Section icon={<BubbleChart sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Highly Correlated Pairs">
              <Stack spacing={1}>
                {eda.correlation_analysis.highly_correlated_pairs.map((p, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, background: '#fafbfc', border: '1px solid #f1f5f9' }}>
                    <Chip label={p.feature1} size="small" />
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>↔</Typography>
                    <Chip label={p.feature2} size="small" />
                    <Box sx={{ ml: 'auto' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: Math.abs(p.correlation) > 0.9 ? '#dc2626' : '#f59e0b' }}>r = {p.correlation}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Section>
          )}

          {/* Multivariate */}
          {eda?.multivariate_analysis && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip icon={<Science sx={{ fontSize: 16 }} />} label={`PCA Suitable: ${eda.multivariate_analysis.suitable_for_pca ? 'Yes' : 'No'}`} size="small"
                sx={{ background: eda.multivariate_analysis.suitable_for_pca ? '#dcfce7' : '#fef2f2', color: eda.multivariate_analysis.suitable_for_pca ? '#16a34a' : '#dc2626', fontWeight: 600 }}
              />
            </Box>
          )}
        </>
      )}

      {/* ═══ AI INSIGHTS TAB ═══ */}
      {tabs[tab]?.label === 'AI Insights' && (
        <>
          {llm?.executive_summary && (
            <Section icon={<Lightbulb sx={{ fontSize: 18, color: '#f59e0b' }} />} title="Executive Summary" accent="#fef9c3">
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.9 }}>{llm.executive_summary}</Typography>
            </Section>
          )}
          {llm?.key_findings && (
            <Section icon={<TrendingUp sx={{ fontSize: 18, color: '#16a34a' }} />} title="Key Findings" accent="#dcfce7">
              <Stack spacing={1.5}>
                {llm.key_findings.map((f, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <CheckCircle sx={{ fontSize: 18, color: '#16a34a', mt: .25, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>{f}</Typography>
                  </Box>
                ))}
              </Stack>
            </Section>
          )}
          {llm?.next_steps && (
            <Section icon={<AutoAwesome sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Recommended Next Steps">
              <Stack spacing={1}>
                {llm.next_steps.map((s, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 22, height: 22, borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: .15 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#6C3AFF', fontSize: '.65rem' }}>{i + 1}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>{s}</Typography>
                  </Box>
                ))}
              </Stack>
            </Section>
          )}
        </>
      )}

      {/* ═══ STATISTICS TAB ═══ */}
      {tabs[tab]?.label === 'Statistics' && (
        <>
          {/* Summary stats */}
          {eda?.numeric_analysis?.summary_stats && (() => {
            const s = eda.numeric_analysis.summary_stats;
            const cols = Object.keys(s);
            const stats = Object.keys(s[cols[0]]);
            return (
              <Section icon={<TableChart sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Summary Statistics">
                <StyledTable heads={['Stat', ...cols]} rows={stats.map(st => (
                  <TableRow key={st} sx={{ '&:hover': { background: '#fafbfc' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{st}</TableCell>
                    {cols.map(c => <TableCell key={c + st}>{fmt(s[c][st])}</TableCell>)}
                  </TableRow>
                ))} />
              </Section>
            );
          })()}

          {/* Skewness & Kurtosis side by side */}
          {(eda?.numeric_analysis?.skewness || eda?.numeric_analysis?.kurtosis) && (
            <Grid container spacing={2} sx={{ mb: 1 }}>
              {eda.numeric_analysis.skewness && (
                <Grid item xs={12} md={6}>
                  <Section icon={<TrendingUp sx={{ fontSize: 18, color: '#a855f7' }} />} title="Skewness">
                    <StyledTable heads={['Column', 'Value']} rows={Object.entries(eda.numeric_analysis.skewness).map(([c, v]) => (
                      <TableRow key={c} sx={{ '&:hover': { background: '#fafbfc' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                        <TableCell>
                          <Chip label={fmt(v)} size="small" sx={{ fontWeight: 600, background: Math.abs(v) > 1 ? '#fef2f2' : '#f0fdf4', color: Math.abs(v) > 1 ? '#dc2626' : '#16a34a', fontSize: '.75rem' }} />
                        </TableCell>
                      </TableRow>
                    ))} />
                  </Section>
                </Grid>
              )}
              {eda.numeric_analysis.kurtosis && (
                <Grid item xs={12} md={6}>
                  <Section icon={<TrendingUp sx={{ fontSize: 18, color: '#a855f7' }} />} title="Kurtosis">
                    <StyledTable heads={['Column', 'Value']} rows={Object.entries(eda.numeric_analysis.kurtosis).map(([c, v]) => (
                      <TableRow key={c} sx={{ '&:hover': { background: '#fafbfc' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                        <TableCell><Chip label={fmt(v)} size="small" sx={{ fontWeight: 600, fontSize: '.75rem' }} /></TableCell>
                      </TableRow>
                    ))} />
                  </Section>
                </Grid>
              )}
            </Grid>
          )}

          {/* Outliers */}
          {eda?.numeric_analysis?.outliers_iqr && Object.values(eda.numeric_analysis.outliers_iqr).some(o => o.count > 0) && (
            <Section icon={<WarningAmber sx={{ fontSize: 18, color: '#f59e0b' }} />} title="Outliers (IQR Method)" accent="#fef9c3">
              <StyledTable heads={['Column', 'Count', '%', 'Lower', 'Upper']} rows={Object.entries(eda.numeric_analysis.outliers_iqr).filter(([, o]) => o.count > 0).map(([c, o]) => (
                <TableRow key={c} sx={{ '&:hover': { background: '#fafbfc' } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                  <TableCell><Chip label={o.count} size="small" sx={{ fontWeight: 700, background: '#fef2f2', color: '#dc2626', fontSize: '.75rem' }} /></TableCell>
                  <TableCell>{o.percentage}%</TableCell>
                  <TableCell>{fmt(o.lower_bound)}</TableCell>
                  <TableCell>{fmt(o.upper_bound)}</TableCell>
                </TableRow>
              ))} />
            </Section>
          )}

          {/* Normality tests */}
          {eda?.numeric_analysis?.normality_tests && Object.keys(eda.numeric_analysis.normality_tests).length > 0 && (
            <Section icon={<Science sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Normality Tests">
              <StyledTable heads={['Column', 'Shapiro p-value', "D'Agostino p-value", 'Normal?']} rows={Object.entries(eda.numeric_analysis.normality_tests).map(([c, t]) => {
                const sp = t?.shapiro_wilk?.p_value;
                const dp = t?.dagostino_k2?.p_value;
                const normal = (sp ?? dp ?? 0) > 0.05;
                return (
                  <TableRow key={c} sx={{ '&:hover': { background: '#fafbfc' } }}>
                    <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                    <TableCell>{sp != null ? fmt(sp) : '—'}</TableCell>
                    <TableCell>{dp != null ? fmt(dp) : '—'}</TableCell>
                    <TableCell><Chip label={normal ? 'Yes' : 'No'} size="small" sx={{ fontWeight: 600, background: normal ? '#dcfce7' : '#fef2f2', color: normal ? '#16a34a' : '#dc2626', fontSize: '.75rem' }} /></TableCell>
                  </TableRow>
                );
              })} />
            </Section>
          )}

          {/* Categorical */}
          {eda?.categorical_analysis && (
            <Section icon={<Category sx={{ fontSize: 18, color: '#6C3AFF' }} />} title="Categorical Analysis">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5, display: 'block', mb: 1 }}>Top Values</Typography>
                  <StyledTable heads={['Column', 'Value', 'Count']} rows={Object.entries(eda.categorical_analysis.value_counts).flatMap(([c, cs]) =>
                    Object.entries(cs).slice(0, 5).map(([v, n]) => (
                      <TableRow key={`${c}-${v}`} sx={{ '&:hover': { background: '#fafbfc' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                        <TableCell>{v}</TableCell>
                        <TableCell>{n.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5, display: 'block', mb: 1 }}>Unique Values & Entropy</Typography>
                  <StyledTable heads={['Column', 'Unique', 'Entropy']} rows={Object.keys(eda.categorical_analysis.unique_values).map(c => (
                    <TableRow key={c} sx={{ '&:hover': { background: '#fafbfc' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                      <TableCell>{eda.categorical_analysis.unique_values[c]}</TableCell>
                      <TableCell>{eda.categorical_analysis.entropy[c]?.toFixed(3)}</TableCell>
                    </TableRow>
                  ))} />
                </Grid>
              </Grid>
            </Section>
          )}

          {/* ANOVA */}
          {eda?.categorical_numeric_relationships && Object.keys(eda.categorical_numeric_relationships).length > 0 && (
            <Section icon={<Science sx={{ fontSize: 18, color: '#a855f7' }} />} title="ANOVA Relationships">
              <StyledTable heads={['Categorical', 'Numeric', 'F-stat', 'p-value', 'Significant?']} rows={Object.entries(eda.categorical_numeric_relationships).flatMap(([c, ns]) =>
                Object.entries(ns).map(([n, s]) => {
                  const sig = s.anova_p_value < 0.05;
                  return (
                    <TableRow key={`${c}-${n}`} sx={{ '&:hover': { background: '#fafbfc' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{c}</TableCell>
                      <TableCell>{n}</TableCell>
                      <TableCell>{s.anova_f_stat?.toFixed(3)}</TableCell>
                      <TableCell>{s.anova_p_value?.toFixed(4)}</TableCell>
                      <TableCell><Chip label={sig ? 'Yes' : 'No'} size="small" sx={{ fontWeight: 600, background: sig ? '#dcfce7' : '#f1f5f9', color: sig ? '#16a34a' : '#94a3b8', fontSize: '.75rem' }} /></TableCell>
                    </TableRow>
                  );
                })
              )} />
            </Section>
          )}
        </>
      )}

      {/* ═══ VISUALIZATIONS TAB ═══ */}
      {tabs[tab]?.label === 'Visualizations' && (
        <Grid container spacing={2.5}>
          {plots.map((p, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'capitalize' }}>{p.name.replace(/_/g, ' ')}</Typography>
                  <Chip label={p.mime === 'text/html' ? 'Interactive' : 'Static'} size="small" sx={{ fontSize: '.65rem', height: 20, fontWeight: 600 }} />
                </Box>
                <Box sx={{ p: 1 }}>
                  {p.mime === 'text/html' ? (
                    <iframe srcDoc={atob(p.b64)} title={p.name} style={{ width: '100%', height: 420, border: 'none', borderRadius: 8 }} sandbox="allow-scripts allow-same-origin" />
                  ) : (
                    <img src={`data:${p.mime};base64,${p.b64}`} alt={p.name} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
export default AnalysisResults;
