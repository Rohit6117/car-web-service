from sqlalchemy.orm import Session
from fastapi import HTTPException
from register_page.schema import schema
from register_page.model import model
# import auth
# from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
def create_user(db: Session, user: schema.UserCreate):
    db_user = db.query(model.UserCreate).filter(model.UserCreate.user_email == user.user_email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # hashed_pw=auth.hash_password(user.user_password)
    new_user = model.UserCreate(
        user_name=user.user_name, 
        user_email=user.user_email,
        user_phone=user.user_phone,
        user_package=user.user_package,
        user_password=user.user_password,
        created_at= datetime.utcnow(),
        updated_at = None,
        deleted_at= None
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    # return f"{db_user} UserData Add Successfully.!" 
    return new_user

# def login(form_data: OAuth2PasswordRequestForm, db: Session):
#     user = db.query(models.UserCreate).filter(models.UserCreate.user_email == form_data.username).first()
#     if not user or not auth.verify_password(form_data.password, user.user_password):
#         raise HTTPException(status_code=400, detail="Invalid credentials")

#     token = auth.create_access_token(data={"sub": user.user_email})
#     return {"access_token": token, "token_type": "bearer"}

# def update_user(token:str,db: Session, user: schemas.UserUpdatedData,user_email:str):
#     email = auth.verify_token(token)
#     if not email:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     db_user = db.query(models.UserCreate).filter(
#         models.UserCreate.user_email==user_email).first()
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User Not Found.!")

#     db_user.user_name = user.user_name
#     db_user.user_email = user.user_email
#     db_user.user_fullname=user.user_fullname
#     db_user.user_bio=user.user_bio
#     # db_user.user_createdat=user.user_updatedat
#     db_user.user_createdat=datetime.utcnow()
#     db.commit()
#     db.refresh(db_user) 
#     # return f"{db_user} UserData Update Successfully.!" 
#     # return db_user
#     return schemas.UserUpdatedResponse(
#         user_name=db_user.user_name,
#         user_email=db_user.user_email,
#         user_fullname=db_user.user_fullname,
#         user_bio=db_user.user_bio,
#         user_updatedat=user.user_updatedat,

#     )


# def delete_user(db: Session, user_id: int,user_password:int):
    
#     db_user = db.query(models.UserCreate).filter(
#         models.UserCreate.user_id == user_id, 
#         models.UserCreate.user_password==user_password).first()
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User Not Found")
#     db.delete(db_user)
#     db.commit()
#     # return f"{db_user} UserData Deleted.!"
#     return db_user 

def show_user(db: Session, data:schema.UserLogin):
    db_user = db.query(model.UserCreate).filter(
        model.UserCreate.user_email == data.user_email,
        model.UserCreate.user_password==data.user_password).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User Not Found")
    # return f"{db_user} Data Showing...."
    return db_user

# def me(token: str , db: Session):
#     email = auth.verify_token(token)
#     if not email:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     user = db.query(models.UserCreate).filter(models.UserCreate.user_email == email).first()
#     return user
