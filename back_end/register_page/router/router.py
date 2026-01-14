from fastapi import APIRouter, Depends
from register_page.schema import schema
from register_page.service import service
from sqlalchemy.orm import Session
from database.db import get_db
# from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm

router = APIRouter()
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/user", response_model=schema.UserResponse)
def create_users(user: schema.UserCreate, db: Session = Depends(get_db)):
    return service.create_user(db, user)

# @router.post("/login", response_model=schemas.Token)
# def login_users(form_data: OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)):
#     return login(form_data,db)

# @router.put("/user/update/{user_id}", response_model=schemas.UserResponse)
# def update_users(user_id: int,user_password:int, user: schemas.UserData, db: Session = Depends(get_db)):
#     return services.update_user(db, user, user_id,user_password)

# @router.put("/user/update/{user_id}", response_model=schemas.UserUpdatedResponse)
# def update_users(user_email:str,user: schemas.UserUpdatedData, db: Session = Depends(get_db),token:str = Depends(oauth2_scheme)):
#     return services.update_user(token,db, user,user_email)

# @router.delete("/user/delete/{user_id}", response_model=schemas.UserResponse)
# def delete_users(user_id: int,user_password:int, db: Session = Depends(get_db)):
#     return services.delete_user(db, user_id,user_password)

@router.post("/user/show")
def show_users(data:schema.UserLogin, db: Session = Depends(get_db)):
    return service.show_user(db, data)

# @router.get("/user/show/{user_id}", response_model=schemas.UserResponse)
# def show_users(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     return services.me(token,db)