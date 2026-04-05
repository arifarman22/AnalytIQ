import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, BigInteger, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=False)
    rows = Column(Integer, default=0)
    cols = Column(Integer, default=0)
    columns = Column(JSON, default=list)
    file_size_bytes = Column(BigInteger, default=0)
    file_content = Column(Text, nullable=True)  # Store CSV content directly for serverless
    file_type = Column(String, default=".csv")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="datasets")
    analyses = relationship("Analysis", back_populates="dataset", cascade="all, delete-orphan")


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    dataset_id = Column(UUID(as_uuid=True), ForeignKey("datasets.id"), nullable=False)
    prompt = Column(Text, nullable=False)
    eda = Column(JSON, default=dict)
    plots = Column(JSON, default=list)
    insights = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="analyses")
    dataset = relationship("Dataset", back_populates="analyses")
