from sqlalchemy import Column,String,Integer,DateTime
from database.db import Base
class UserCreate(Base): 
    __tablename__='Userss'
    user_id=Column(Integer,primary_key=True)
    user_name=Column(String,nullable=False,unique=True)
    user_email=Column(String,nullable=False,unique=True)
    user_package=Column(String)
    user_password=Column(String)
    user_phone=Column(String)
    created_at=Column(DateTime)
    updated_at=Column(DateTime)
    deleted_at=Column(DateTime)
    
