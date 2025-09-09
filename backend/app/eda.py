import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import base64
import io
from scipy import stats
from sklearn.preprocessing import LabelEncoder
from scipy.stats import shapiro, normaltest, anderson, chi2_contingency
import warnings
warnings.filterwarnings('ignore')

def df_to_base64_png(fig):
    """Convert plotly figure to base64 encoded PNG"""
    img_bytes = fig.to_image(format='png', width=1000, height=600, scale=2)
    return base64.b64encode(img_bytes).decode('utf-8')

def convert_np(obj):
    if isinstance(obj, (np.integer, np.int64, np.int32)):
        return int(obj)
    if isinstance(obj, (np.floating, np.float64, np.float32)):
        return float(obj)
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    return obj

def generate_eda(df: pd.DataFrame):
    """Generate comprehensive EDA suitable for LLM consumption"""
    # Basic information
    eda = {
        'dataset_info': {
            'rows': int(len(df)),
            'columns': int(len(df.columns)),
            'total_memory_bytes': int(df.memory_usage(deep=True).sum()),
            'duplicate_rows': int(df.duplicated().sum()),
            'duplicate_percentage': float(round((df.duplicated().sum() / len(df)) * 100, 2))
        },
        'columns': list(df.columns),
        'dtypes': df.dtypes.astype(str).to_dict(),
        'missing_values': {
            'count': {k: int(v) for k, v in df.isnull().sum().to_dict().items()},
            'percentage': {col: float(round((df[col].isnull().sum() / len(df)) * 100, 2)) 
                          for col in df.columns},
            'total_missing': int(df.isnull().sum().sum()),
            'total_missing_percentage': float(round((df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100, 2))
        }
    }
    
    # Numeric analysis
    numeric_cols = df.select_dtypes(include=['number']).columns
    if len(numeric_cols) > 0:
        numeric_df = df[numeric_cols]
        eda['numeric_analysis'] = {
            'summary_stats': {k: {kk: convert_np(vv) for kk, vv in v.items()} for k, v in numeric_df.describe().to_dict().items()},
            'skewness': {k: float(v) for k, v in numeric_df.skew().to_dict().items()},
            'kurtosis': {k: float(v) for k, v in numeric_df.kurtosis().to_dict().items()},
            'zeros_count': {col: int((numeric_df[col] == 0).sum()) for col in numeric_cols},
            'outliers_iqr': {},
            'normality_tests': {},
            'variance_inflation_factors': {}
        }
        
        # Outlier detection using IQR method
        for col in numeric_cols:
            Q1 = numeric_df[col].quantile(0.25)
            Q3 = numeric_df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            outliers = numeric_df[(numeric_df[col] < lower_bound) | (numeric_df[col] > upper_bound)]
            eda['numeric_analysis']['outliers_iqr'][col] = {
                'count': int(len(outliers)),
                'percentage': float(round((len(outliers) / len(numeric_df)) * 100, 2)),
                'lower_bound': float(lower_bound),
                'upper_bound': float(upper_bound)
            }
            
            # Normality tests
            data = numeric_df[col].dropna()
            if len(data) > 3:
                # Shapiro-Wilk test (for smaller samples)
                if len(data) < 5000:
                    shapiro_stat, shapiro_p = shapiro(data)
                    eda['numeric_analysis']['normality_tests'][col] = {
                        'shapiro_wilk': {'statistic': float(shapiro_stat), 'p_value': float(shapiro_p)}
                    }
                
                # D'Agostino's K^2 test
                k2_stat, k2_p = normaltest(data)
                eda['numeric_analysis']['normality_tests'][col].update({
                    'dagostino_k2': {'statistic': float(k2_stat), 'p_value': float(k2_p)}
                })
    
    # Categorical analysis
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    if len(categorical_cols) > 0:
        categorical_df = df[categorical_cols]
        eda['categorical_analysis'] = {
            'value_counts': {col: {k: int(v) for k, v in df[col].value_counts().head(10).to_dict().items()} for col in categorical_cols},
            'unique_values': {col: int(df[col].nunique()) for col in categorical_cols},
            'mode': {col: df[col].mode().iloc[0] if not df[col].mode().empty else None for col in categorical_cols},
            'entropy': {col: float(stats.entropy(df[col].value_counts(normalize=True))) for col in categorical_cols}
        }
    
    # DateTime analysis (if any datetime columns)
    datetime_cols = df.select_dtypes(include=['datetime64']).columns
    if len(datetime_cols) > 0:
        datetime_df = df[datetime_cols]
        eda['datetime_analysis'] = {
            'range': {col: {
                'min': str(datetime_df[col].min()),
                'max': str(datetime_df[col].max()),
                'timespan_days': int((datetime_df[col].max() - datetime_df[col].min()).days)
            } for col in datetime_cols},
            'seasonality_analysis': {}
        }
        
        # Add basic time series decomposition for datetime columns
        for col in datetime_cols:
            if len(df) > 100:  # Only for larger datasets
                ts_data = df.set_index(col).select_dtypes(include=['number']).mean(axis=1)
                if len(ts_data) > 0:
                    # Simple trend analysis
                    rolling_mean = ts_data.rolling(window=30, min_periods=1).mean()
                    eda['datetime_analysis']['seasonality_analysis'][col] = {
                        'has_trend': float(rolling_mean.iloc[-1] - rolling_mean.iloc[0]) != 0
                    }
    
    # Correlation analysis
    if len(numeric_cols) > 1:
        correlation_matrix = df[numeric_cols].corr()
        eda['correlation_analysis'] = {
            'matrix': {k: {kk: float(vv) for kk, vv in v.items()} for k, v in correlation_matrix.to_dict().items()},
            'highly_correlated_pairs': [],
            'correlation_with_pvalues': {}
        }
        
        # Find highly correlated pairs (|r| > 0.8)
        for i in range(len(correlation_matrix.columns)):
            for j in range(i):
                corr_value = correlation_matrix.iloc[i, j]
                if abs(corr_value) > 0.8:
                    # Calculate p-value for correlation
                    p_value = stats.pearsonr(df[numeric_cols[i]].dropna(), df[numeric_cols[j]].dropna())[1]
                    
                    eda['correlation_analysis']['highly_correlated_pairs'].append({
                        'feature1': correlation_matrix.columns[i],
                        'feature2': correlation_matrix.columns[j],
                        'correlation': float(round(corr_value, 3)),
                        'p_value': float(p_value)
                    })
    
    # Cardinality analysis
    eda['cardinality'] = {
        'high_cardinality_features': {col: int(df[col].nunique()) for col in df.columns 
                                     if df[col].nunique() > 50 and df[col].nunique() < len(df) / 2}
    }
    
    # Relationship analysis between categorical and numeric variables
    if len(categorical_cols) > 0 and len(numeric_cols) > 0:
        eda['categorical_numeric_relationships'] = {}
        
        # For each categorical variable, analyze relationship with numeric variables
        for cat_col in categorical_cols[:3]:  # Limit to first 3 to avoid combinatorial explosion
            if df[cat_col].nunique() <= 10:  # Only for categorical with reasonable number of categories
                eda['categorical_numeric_relationships'][cat_col] = {}
                
                for num_col in numeric_cols[:3]:  # Limit to first 3 numeric
                    # ANOVA test for difference in means across categories
                    groups = [df[df[cat_col] == category][num_col].dropna() for category in df[cat_col].unique()]
                    if all(len(group) > 1 for group in groups):  # Ensure we have at least 2 samples per group
                        f_stat, p_value = stats.f_oneway(*groups)
                        eda['categorical_numeric_relationships'][cat_col][num_col] = {
                            'anova_f_stat': float(f_stat),
                            'anova_p_value': float(p_value),
                            'mean_by_category': {str(cat): float(df[df[cat_col] == cat][num_col].mean()) 
                                               for cat in df[cat_col].unique()}
                        }
    
    # Multivariate analysis - PCA readiness check
    if len(numeric_cols) > 1:
        # Check if data is suitable for PCA (no constant variables, sufficient variance)
        numeric_df = df[numeric_cols].dropna()
        if len(numeric_df) > 0:
            variances = numeric_df.var()
            constant_vars = variances[variances == 0].index.tolist()
            low_variance_vars = variances[variances < 0.01].index.tolist()
            
            eda['multivariate_analysis'] = {
                'constant_variables': constant_vars,
                'low_variance_variables': low_variance_vars,
                'suitable_for_pca': len(constant_vars) == 0 and len(low_variance_vars) / len(numeric_cols) < 0.5
            }
    
    return eda

def generate_default_plots(df: pd.DataFrame, max_plots=10):
    """Generate comprehensive visualizations for EDA"""
    plots = []
    
    # 1) Correlation heatmap for numeric features
    numeric_cols = df.select_dtypes(include=['number']).columns
    if len(numeric_cols) >= 2:
        corr_matrix = df[numeric_cols].corr()
        fig = px.imshow(
            corr_matrix, 
            title='Feature Correlation Matrix',
            color_continuous_scale='RdBu_r',
            aspect="auto",
            zmin=-1, 
            zmax=1
        )
        plots.append({'name': 'correlation_matrix', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 2) Missing values visualization
    missing_data = df.isnull().sum()
    if missing_data.sum() > 0:
        missing_df = pd.DataFrame({
            'column': missing_data.index,
            'missing_count': missing_data.values,
            'missing_percentage': (missing_data.values / len(df)) * 100
        }).sort_values('missing_percentage', ascending=False)
        
        fig = px.bar(
            missing_df[missing_df['missing_count'] > 0],
            x='column',
            y='missing_percentage',
            title='Missing Values by Column (%)',
            labels={'column': 'Column', 'missing_percentage': 'Missing Values (%)'}
        )
        fig.update_layout(xaxis_tickangle=-45)
        plots.append({'name': 'missing_values', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 3) Distribution of numeric features with Q-Q plots
    if len(numeric_cols) > 0:
        # Create subplots for distributions
        n_cols = min(3, len(numeric_cols))
        n_rows = int(np.ceil(len(numeric_cols) / n_cols))
        
        fig = make_subplots(
            rows=n_rows, 
            cols=n_cols,
            subplot_titles=numeric_cols
        )
        
        for i, col in enumerate(numeric_cols):
            row = (i // n_cols) + 1
            col_num = (i % n_cols) + 1
            
            fig.add_trace(
                go.Histogram(x=df[col], name=col),
                row=row, 
                col=col_num
            )
        
        fig.update_layout(
            title_text="Distribution of Numeric Features",
            height=300 * n_rows,
            showlegend=False
        )
        plots.append({'name': 'numeric_distributions', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
        
        # Q-Q plots for normality check
        if len(numeric_cols) > 0:
            n_cols = min(2, len(numeric_cols))
            n_rows = int(np.ceil(len(numeric_cols) / n_cols))
            
            fig = make_subplots(
                rows=n_rows, 
                cols=n_cols,
                subplot_titles=[f"Q-Q Plot: {col}" for col in numeric_cols],
                vertical_spacing=0.1
            )
            
            for i, col in enumerate(numeric_cols):
                row = (i // n_cols) + 1
                col_num = (i % n_cols) + 1
                
                # Create Q-Q plot
                qq_data = stats.probplot(df[col].dropna(), dist="norm")
                x = qq_data[0][0]
                y = qq_data[0][1]
                
                fig.add_trace(
                    go.Scatter(x=x, y=y, mode='markers', name=col),
                    row=row, 
                    col=col_num
                )
                
                # Add theoretical line
                fig.add_trace(
                    go.Scatter(x=x, y=qq_data[1][0] * x + qq_data[1][1], 
                              mode='lines', name='Normal', line=dict(color='red')),
                    row=row, 
                    col=col_num
                )
            
            fig.update_layout(
                title_text="Q-Q Plots for Normality Check",
                height=400 * n_rows,
                showlegend=False
            )
            plots.append({'name': 'qq_plots', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 4) Box plots for outlier detection
    if len(numeric_cols) > 0:
        n_cols = min(3, len(numeric_cols))
        n_rows = int(np.ceil(len(numeric_cols) / n_cols))
        
        fig = make_subplots(
            rows=n_rows, 
            cols=n_cols,
            subplot_titles=numeric_cols,
            vertical_spacing=0.1
        )
        
        for i, col in enumerate(numeric_cols):
            row = (i // n_cols) + 1
            col_num = (i % n_cols) + 1
            
            fig.add_trace(
                go.Box(y=df[col], name=col),
                row=row, 
                col=col_num
            )
        
        fig.update_layout(
            title_text="Box Plots for Outlier Detection",
            height=300 * n_rows,
            showlegend=False
        )
        plots.append({'name': 'outlier_detection', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 5) Categorical features analysis
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    if len(categorical_cols) > 0:
        for col in categorical_cols[:3]:  # Limit to first 3 categorical features
            value_counts = df[col].value_counts().nlargest(15)  # Top 15 categories
            
            fig = px.bar(
                x=value_counts.index.astype(str),
                y=value_counts.values,
                title=f'Top Categories: {col}',
                labels={'x': col, 'y': 'Count'}
            )
            fig.update_layout(xaxis_tickangle=-45)
            plots.append({'name': f'categorical_{col}', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
            
            # Pie chart for top categories if not too many
            if df[col].nunique() <= 10:
                fig = px.pie(
                    values=value_counts.values,
                    names=value_counts.index.astype(str),
                    title=f'Distribution: {col}'
                )
                plots.append({'name': f'pie_{col}', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 6) Relationship between categorical and numeric variables
    if len(categorical_cols) > 0 and len(numeric_cols) > 0:
        # For each categorical variable with few categories, show box plots for numeric variables
        for cat_col in categorical_cols[:2]:  # Limit to first 2 categorical
            if df[cat_col].nunique() <= 8:  # Only for categorical with reasonable number of categories
                for num_col in numeric_cols[:2]:  # Limit to first 2 numeric
                    fig = px.box(
                        df, 
                        x=cat_col, 
                        y=num_col,
                        title=f'{num_col} by {cat_col}'
                    )
                    plots.append({'name': f'box_{num_col}_by_{cat_col}', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 7) Pairplot for top numeric features (if not too many)
    if len(numeric_cols) >= 2 and len(numeric_cols) <= 5:
        fig = px.scatter_matrix(
            df[numeric_cols],
            title="Pairwise Relationships Between Numeric Features",
            height=800
        )
        plots.append({'name': 'pairplot', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    elif len(numeric_cols) > 5:
        # Select top 5 numeric features by variance
        numeric_variance = df[numeric_cols].var().sort_values(ascending=False)
        top_numeric = numeric_variance.head(5).index.tolist()
        
        fig = px.scatter_matrix(
            df[top_numeric],
            title="Pairwise Relationships Between Top 5 Numeric Features (by Variance)",
            height=800
        )
        plots.append({'name': 'pairplot_top5', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    # 8) Time series plots if datetime columns exist
    datetime_cols = df.select_dtypes(include=['datetime64']).columns
    if len(datetime_cols) > 0:
        for dt_col in datetime_cols[:1]:  # Only first datetime column
            for num_col in numeric_cols[:2]:  # First two numeric columns
                if len(df) > 100:  # Only for larger datasets
                    time_df = df.sort_values(dt_col)
                    fig = px.line(
                        time_df, 
                        x=dt_col, 
                        y=num_col,
                        title=f'{num_col} over Time'
                    )
                    plots.append({'name': f'timeseries_{num_col}', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
                    
                    # Add rolling average
                    rolling_df = time_df.set_index(dt_col)[num_col].rolling(window=30).mean().reset_index()
                    fig.add_trace(go.Scatter(
                        x=rolling_df[dt_col], 
                        y=rolling_df[num_col],
                        mode='lines',
                        name='30-day Rolling Avg',
                        line=dict(color='red', dash='dash')
                    ))
                    plots.append({'name': f'timeseries_rolling_{num_col}', 'mime': 'image/png', 'b64': df_to_base64_png(fig)})
    
    return plots[:max_plots]