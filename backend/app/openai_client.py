import os
from typing import Dict, Any
import pandas as pd
from openai import OpenAI


def generate_insights_from_prompt(df: pd.DataFrame, prompt: str, eda: Dict[str, Any]) -> Dict[str, Any]:
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ImportError("OpenAI API key not configured")

    client = OpenAI(api_key=api_key)

    context = f"""
    Dataset shape: {df.shape}
    Columns: {list(df.columns)}
    Numeric columns: {df.select_dtypes(include=['number']).columns.tolist()}
    Missing values: {eda.get('missing_values', {}).get('total_missing', 'N/A')}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a data analyst providing insights about datasets."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {prompt}"}
        ],
        max_tokens=500
    )

    return {
        "insights": response.choices[0].message.content,
        "model": "gpt-3.5-turbo",
        "prompt": prompt
    }
