import uuid
from datetime import datetime
from pydantic import BaseModel, Field

class MessageCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=2000)

class MessageResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    user_id: uuid.UUID
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class MessageListResponse(BaseModel):
    messages: list[MessageResponse]
