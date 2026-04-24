import logging
import numpy as np
import pandas as pd
from typing import Dict, Any, Optional
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import (
    r2_score, mean_absolute_error, mean_squared_error,
    accuracy_score, precision_score, recall_score, f1_score, classification_report
)
import warnings
warnings.filterwarnings('ignore')

logger = logging.getLogger("analytiq")

MAX_ROWS = 50_000
MAX_CATEGORIES = 20


def _detect_target(df: pd.DataFrame, target: Optional[str] = None) -> tuple:
    if target and target in df.columns:
        col = df[target]
        task = "classification" if col.dtype == 'object' or col.nunique() <= 10 else "regression"
        return target, task

    # Auto-detect: prefer last column, or column named 'target'/'label'/'class'
    for name in ['target', 'label', 'class', 'y', 'output', 'result']:
        if name in df.columns:
            col = df[name]
            task = "classification" if col.dtype == 'object' or col.nunique() <= 10 else "regression"
            return name, task

    # Use last column
    target = df.columns[-1]
    col = df[target]
    task = "classification" if col.dtype == 'object' or col.nunique() <= 10 else "regression"
    return target, task


def _prepare_data(df: pd.DataFrame, target: str):
    df = df.dropna(subset=[target]).copy()
    if len(df) > MAX_ROWS:
        df = df.sample(n=MAX_ROWS, random_state=42)

    y = df[target]
    X = df.drop(columns=[target])

    # Encode categorical features
    label_encoders = {}
    for col in X.select_dtypes(include=['object', 'category']).columns:
        if X[col].nunique() > MAX_CATEGORIES:
            X = X.drop(columns=[col])
            continue
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le

    # Drop remaining non-numeric
    X = X.select_dtypes(include=['number'])

    # Fill NaN with median
    X = X.fillna(X.median())

    # Encode target if classification
    target_encoder = None
    if y.dtype == 'object':
        target_encoder = LabelEncoder()
        y = pd.Series(target_encoder.fit_transform(y.astype(str)), index=y.index)

    return X, y, label_encoders, target_encoder


def run_prediction(df: pd.DataFrame, target_col: Optional[str] = None) -> Dict[str, Any]:
    target, task = _detect_target(df, target_col)
    logger.info(f"ML: target={target}, task={task}, shape={df.shape}")

    X, y, label_encoders, target_encoder = _prepare_data(df, target)

    if X.shape[1] == 0:
        return {"error": "No usable features found after preprocessing."}
    if len(X) < 10:
        return {"error": "Not enough data rows for training (need at least 10)."}

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Scale features
    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)

    if task == "regression":
        models = {
            "Linear Regression": LinearRegression(),
            "Ridge Regression": Ridge(alpha=1.0),
            "Lasso Regression": Lasso(alpha=0.1),
            "Decision Tree": DecisionTreeRegressor(max_depth=10, random_state=42),
            "Random Forest": RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1),
            "Gradient Boosting": GradientBoostingRegressor(n_estimators=100, max_depth=5, random_state=42),
        }
    else:
        n_classes = y.nunique()
        models = {
            "Logistic Regression": LogisticRegression(max_iter=500, random_state=42),
            "Decision Tree": DecisionTreeClassifier(max_depth=10, random_state=42),
            "Random Forest": RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1),
            "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, max_depth=5, random_state=42),
        }

    results = {}
    best_name, best_score = None, -np.inf

    for name, model in models.items():
        try:
            use_scaled = name in ("Linear Regression", "Ridge Regression", "Lasso Regression", "Logistic Regression")
            model.fit(X_train_s if use_scaled else X_train, y_train)
            preds = model.predict(X_test_s if use_scaled else X_test)

            if task == "regression":
                r2 = float(r2_score(y_test, preds))
                mae = float(mean_absolute_error(y_test, preds))
                rmse = float(np.sqrt(mean_squared_error(y_test, preds)))
                results[name] = {"r2": round(r2, 4), "mae": round(mae, 4), "rmse": round(rmse, 4)}
                score = r2
            else:
                avg = 'binary' if n_classes == 2 else 'weighted'
                acc = float(accuracy_score(y_test, preds))
                prec = float(precision_score(y_test, preds, average=avg, zero_division=0))
                rec = float(recall_score(y_test, preds, average=avg, zero_division=0))
                f1 = float(f1_score(y_test, preds, average=avg, zero_division=0))
                results[name] = {"accuracy": round(acc, 4), "precision": round(prec, 4), "recall": round(rec, 4), "f1": round(f1, 4)}
                score = acc

            if score > best_score:
                best_score, best_name = score, name
        except Exception as e:
            logger.warning(f"Model {name} failed: {e}")
            results[name] = {"error": str(e)}

    # Feature importance from best model
    best_model = models[best_name]
    importance = {}
    if hasattr(best_model, 'feature_importances_'):
        imp = best_model.feature_importances_
        importance = {col: round(float(v), 4) for col, v in sorted(zip(X.columns, imp), key=lambda x: -x[1])[:15]}
    elif hasattr(best_model, 'coef_'):
        coef = best_model.coef_ if best_model.coef_.ndim == 1 else best_model.coef_[0]
        importance = {col: round(float(abs(v)), 4) for col, v in sorted(zip(X.columns, coef), key=lambda x: -abs(x[1]))[:15]}

    # Sample predictions
    sample_size = min(10, len(X_test))
    sample_idx = X_test.index[:sample_size]
    use_scaled = best_name in ("Linear Regression", "Ridge Regression", "Lasso Regression", "Logistic Regression")
    sample_preds = best_model.predict(X_test_s[:sample_size] if use_scaled else X_test.iloc[:sample_size])

    if target_encoder:
        actual_labels = target_encoder.inverse_transform(y_test.iloc[:sample_size].astype(int))
        pred_labels = target_encoder.inverse_transform(sample_preds.astype(int))
        classes = target_encoder.classes_.tolist()
    else:
        actual_labels = y_test.iloc[:sample_size].values
        pred_labels = sample_preds
        classes = None

    sample = [
        {"actual": str(a), "predicted": str(round(p, 3) if task == "regression" else p)}
        for a, p in zip(actual_labels, pred_labels)
    ]

    return {
        "target_column": target,
        "task": task,
        "features_used": list(X.columns),
        "train_size": len(X_train),
        "test_size": len(X_test),
        "models": results,
        "best_model": best_name,
        "best_score": round(float(best_score), 4),
        "feature_importance": importance,
        "sample_predictions": sample,
        **({"classes": classes} if classes else {}),
    }
