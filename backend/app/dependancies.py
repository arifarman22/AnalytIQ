from .services import file_service, analysis_service

def get_file_service() -> file_service.FileService:
    return file_service.FileService()

def get_analysis_service() -> analysis_service.AnalysisService:
    return analysis_service.AnalysisService()