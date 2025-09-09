import openai
import os
from typing import Dict, Any
import pandas as pd

def generate_insights_from_prompt(df: pd.DataFrame, prompt: str, eda: Dict[str, Any]) -> Dict[str, Any]:
    """Generate insights using OpenAI API"""
    # Check if OpenAI is configured
    if not os.getenv('OPENAI_API_KEY'):
        raise ImportError("OpenAI API key not configured")
    
    try:
        # Prepare context from EDA
        context = f"""
        Dataset shape: {df.shape}
        Columns: {list(df.columns)}
        Numeric columns: {df.select_dtypes(include=['number']).columns.tolist()}
        Missing values: {eda['missing_values']['total_missing']}
        """
        
        # Call OpenAI API (simplified example)
        response = openai.ChatCompletion.create(
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
        
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")