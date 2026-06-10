# backend/app/config.py — Pydantic Settings for all env vars (TRD Section 4.2)
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # Supabase Auth
    SUPABASE_URL: str
    SUPABASE_JWT_SECRET: str

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Resend
    RESEND_API_KEY: str = ""

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173"

    # Environment
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
