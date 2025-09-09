// AnalysisResults component (same as before, now uses dark theme)
import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableRow, TableHead, Paper, Chip, Divider, Stack } from '@mui/material';

const AnalysisResults = ({ analysisResult, datasetId }) => {
  if (!analysisResult) return null;
  const { eda } = analysisResult;
  const renderDatasetInfo = () => {
    if (!eda?.dataset_info) return null;
    const info = eda.dataset_info;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Dataset Overview</Typography>
          <Table size="small">
            <TableBody>
              <TableRow><TableCell>Rows</TableCell><TableCell>{info.rows}</TableCell></TableRow>
              <TableRow><TableCell>Columns</TableCell><TableCell>{info.columns}</TableCell></TableRow>
              <TableRow><TableCell>Total Memory (bytes)</TableCell><TableCell>{info.total_memory_bytes}</TableCell></TableRow>
              <TableRow><TableCell>Duplicate Rows</TableCell><TableCell>{info.duplicate_rows} ({info.duplicate_percentage}%)</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const renderDtypes = () => {
    if (!eda?.dtypes) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Column Types</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Column</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(eda.dtypes).map(([col, dtype]) => (
                <TableRow key={col}>
                  <TableCell>{col}</TableCell>
                  <TableCell>{dtype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };


  // Helper to render summary stats
  const renderSummaryStats = () => {
    if (!eda?.numeric_analysis?.summary_stats) return null;
    const stats = eda.numeric_analysis.summary_stats;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Summary Statistics</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Stat</TableCell>
                {Object.keys(stats).map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(stats[Object.keys(stats)[0]]).map((stat) => (
                <TableRow key={stat}>
                  <TableCell>{stat}</TableCell>
                  {Object.keys(stats).map((col) => (
                    <TableCell key={col+stat}>{stats[col][stat]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  // Helper to render missing values
  const renderMissingValues = () => {
    if (!eda?.missing_values?.count) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Missing Values</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Column</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(eda.missing_values.count).map((col) => (
                <TableRow key={col}>
                  <TableCell>{col}</TableCell>
                  <TableCell>{eda.missing_values.count[col]}</TableCell>
                  <TableCell>{eda.missing_values.percentage[col]}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  // Helper to render correlations
  const renderCorrelations = () => {
    if (!eda?.correlation_analysis?.highly_correlated_pairs) return null;
    const pairs = eda.correlation_analysis.highly_correlated_pairs;
    if (!pairs.length) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Highly Correlated Pairs (|r| &gt; 0.8)</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Feature 1</TableCell>
                <TableCell>Feature 2</TableCell>
                <TableCell>Correlation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pairs.map((pair, idx) => (
                <TableRow key={idx}>
                  <TableCell>{pair.feature1}</TableCell>
                  <TableCell>{pair.feature2}</TableCell>
                  <TableCell>{pair.correlation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  // Helper to render cardinality
  const renderCardinality = () => {
    if (!eda?.cardinality?.high_cardinality_features) return null;
    const features = eda.cardinality.high_cardinality_features;
    if (!Object.keys(features).length) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">High Cardinality Features</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                <TableCell>Unique Values</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(features).map(([feature, count]) => (
                <TableRow key={feature}>
                  <TableCell>{feature}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const renderNumericExtras = () => {
    if (!eda?.numeric_analysis) return null;
    const { skewness, kurtosis, zeros_count, outliers_iqr, normality_tests } = eda.numeric_analysis;
    return (
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {skewness && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Skewness</Typography>
                <Table size="small">
                  <TableBody>
                    {Object.entries(skewness).map(([col, val]) => (
                      <TableRow key={col}><TableCell>{col}</TableCell><TableCell>{val}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
        {kurtosis && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Kurtosis</Typography>
                <Table size="small">
                  <TableBody>
                    {Object.entries(kurtosis).map(([col, val]) => (
                      <TableRow key={col}><TableCell>{col}</TableCell><TableCell>{val}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
        {zeros_count && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Zero Counts</Typography>
                <Table size="small">
                  <TableBody>
                    {Object.entries(zeros_count).map(([col, val]) => (
                      <TableRow key={col}><TableCell>{col}</TableCell><TableCell>{val}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
        {outliers_iqr && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Outliers (IQR Method)</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Column</TableCell>
                      <TableCell>Count</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(outliers_iqr).map(([col, stats]) => (
                      <TableRow key={col}>
                        <TableCell>{col}</TableCell>
                        <TableCell>{stats.count}</TableCell>
                        <TableCell>{stats.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
        {normality_tests && Object.keys(normality_tests).length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Normality Tests</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Column</TableCell>
                      <TableCell>Shapiro-Wilk p</TableCell>
                      <TableCell>D'Agostino K² p</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(normality_tests).map(([col, tests]) => (
                      <TableRow key={col}>
                        <TableCell>{col}</TableCell>
                        <TableCell>{tests?.shapiro_wilk?.p_value ?? '-'}</TableCell>
                        <TableCell>{tests?.dagostino_k2?.p_value ?? '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderCategorical = () => {
    if (!eda?.categorical_analysis) return null;
    const { value_counts, unique_values, entropy } = eda.categorical_analysis;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Categorical Analysis</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Top Value Counts (up to 10)</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Column</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(value_counts).flatMap(([col, counts]) => (
                    Object.entries(counts).map(([val, cnt]) => (
                      <TableRow key={`${col}-${val}`}>
                        <TableCell>{col}</TableCell>
                        <TableCell>{val}</TableCell>
                        <TableCell>{cnt}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Unique Values & Entropy</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Column</TableCell>
                    <TableCell>Unique</TableCell>
                    <TableCell>Entropy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(unique_values).map((col) => (
                    <TableRow key={col}>
                      <TableCell>{col}</TableCell>
                      <TableCell>{unique_values[col]}</TableCell>
                      <TableCell>{entropy[col]?.toFixed(3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderCatNumRelationships = () => {
    const rel = eda?.categorical_numeric_relationships;
    if (!rel || Object.keys(rel).length === 0) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Categorical-Numeric Relationships (ANOVA)</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Numeric</TableCell>
                <TableCell>F-stat</TableCell>
                <TableCell>p-value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(rel).flatMap(([cat, nums]) => (
                Object.entries(nums).map(([num, stats]) => (
                  <TableRow key={`${cat}-${num}`}>
                    <TableCell>{cat}</TableCell>
                    <TableCell>{num}</TableCell>
                    <TableCell>{stats.anova_f_stat?.toFixed(3)}</TableCell>
                    <TableCell>{stats.anova_p_value?.toFixed(3)}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const renderMultivariate = () => {
    const mv = eda?.multivariate_analysis;
    if (!mv) return null;
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Multivariate Analysis Readiness</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Chip label={`Suitable for PCA: ${mv.suitable_for_pca ? 'Yes' : 'No'}`} color={mv.suitable_for_pca ? 'success' : 'default'} />
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Constant Variables</Typography>
              {mv.constant_variables?.length ? (
                <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                  {mv.constant_variables.map((v) => (<li key={v}>{v}</li>))}
                </ul>
              ) : (
                <Typography variant="body2" color="text.secondary">None</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Low Variance Variables</Typography>
              {mv.low_variance_variables?.length ? (
                <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                  {mv.low_variance_variables.map((v) => (<li key={v}>{v}</li>))}
                </ul>
              ) : (
                <Typography variant="body2" color="text.secondary">None</Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="analysis-results">
      <Typography variant="h4" gutterBottom>Analysis Results</Typography>
      <Typography variant="subtitle2" gutterBottom>Dataset ID: {datasetId}</Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Executive Summary */}
      {analysisResult.llm?.executive_summary && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Executive Summary</Typography>
            <Typography>{analysisResult.llm.executive_summary}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Key Findings */}
      {analysisResult.llm?.key_findings && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Key Findings</Typography>
            <ul style={{ paddingLeft: '1.2em' }}>
              {analysisResult.llm.key_findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* EDA Insights */}
      {renderDatasetInfo()}
      {renderDtypes()}
      {renderSummaryStats()}
      {renderMissingValues()}
      {renderCorrelations()}
      {renderCardinality()}
      {renderNumericExtras()}
      {renderCategorical()}
      {renderCatNumRelationships()}
      {renderMultivariate()}

      {/* Visualizations */}
      {analysisResult.plots && analysisResult.plots.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Visualizations</Typography>
            <Grid container spacing={2}>
              {analysisResult.plots.map((plot, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
                    <Typography variant="subtitle2">{plot.name}</Typography>
                    <img 
                      src={`data:${plot.mime};base64,${plot.b64}`} 
                      alt={plot.name}
                      style={{ width: '100%', borderRadius: 4 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {analysisResult.llm?.next_steps && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Recommended Next Steps</Typography>
            <ul style={{ paddingLeft: '1.2em' }}>
              {analysisResult.llm.next_steps.map((step, index) => (
                <li key={index}>• {step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Removed raw EDA JSON dump in favor of structured UI */}
    </div>
  );
};

export default AnalysisResults;