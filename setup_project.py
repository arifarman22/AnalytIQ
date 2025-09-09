import os

# Project root
project_root = "data_analyst_bot"

# Directory structure
dirs = [
    f"{project_root}/backend/app",
    f"{project_root}/frontend/src/components",
]

# Files with basic placeholder content
files = {
    # Backend files
    f"{project_root}/backend/app/main.py": "# main FastAPI entrypoint\n",
    f"{project_root}/backend/app/eda.py": "# EDA helper functions\n",
    f"{project_root}/backend/app/openai_client.py": "# LLM/OpenAI helper functions\n",
    f"{project_root}/backend/app/schemas.py": "# Pydantic schemas\n",
    f"{project_root}/backend/requirements.txt": "fastapi\nuvicorn[pure]\npandas\nplotly[kaleido]\npython-multipart\nopenai\npython-dotenv\npydantic\n",
    f"{project_root}/backend/Dockerfile": "FROM python:3.10-slim\nWORKDIR /app\nCOPY requirements.txt ./\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY ./app ./app\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\", \"--reload\"]\n",
    
    # Frontend files
    f"{project_root}/frontend/package.json": "{\n  \"name\": \"frontend\",\n  \"version\": \"0.1.0\",\n  \"private\": true\n}\n",
    f"{project_root}/frontend/Dockerfile": "FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY ./src ./src\nCMD [\"npm\", \"run\", \"dev\"]\n",
    f"{project_root}/frontend/src/App.jsx": "// App main file\n",
    f"{project_root}/frontend/src/index.jsx": "// React entry point\n",
    f"{project_root}/frontend/src/components/FileUploader.jsx": "// FileUploader component\n",
    f"{project_root}/frontend/src/components/PromptBox.jsx": "// PromptBox component\n",
    f"{project_root}/frontend/src/styles.css": "/* CSS styles */\n",
    
    # Root files
    f"{project_root}/docker-compose.yml": "version: '3.8'\nservices:\n  backend:\n    build: ./backend\n    ports:\n      - '8000:8000'\n  frontend:\n    build: ./frontend\n    ports:\n      - '3000:3000'\n",
    f"{project_root}/README.md": "# Data Analyst Bot\n\nProject description goes here.\n",
}

# Create directories
for d in dirs:
    os.makedirs(d, exist_ok=True)

# Create files
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Project structure created at: {os.path.abspath(project_root)}")
