from pydantic import BaseModel ,EmailStr
from datetime import datetime
from typing import Optional

class UserDataBase(BaseModel):
    user_name:Optional[str] = None
    user_email:Optional[EmailStr] = None
    user_password:Optional[str] = None
    user_package:Optional[str] = None
    user_password:Optional[str] = None
    user_phone:Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    
class UserCreate(UserDataBase):
    pass
    
class UserUpdatedData(UserDataBase):
    pass

class UserUpdatedResponse(UserUpdatedData):
    updated_at: Optional[datetime] = None
    
class UserResponse(UserCreate):
    user_id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes =True
        orm_mode = True

class UserLogin(BaseModel):
    user_email: Optional[str] = None
    user_password: Optional[str] = None 
    
class Token(BaseModel):
    access_token:str
    token_type:str