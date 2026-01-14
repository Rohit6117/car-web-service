from fastapi import FastAPI
from register_page.router.router import router
from database.db import Base,engine

Base.metadata.create_all(bind=engine)


app=FastAPI()
app.include_router(router,tags=['Register Page'])
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5500"] for security
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)
