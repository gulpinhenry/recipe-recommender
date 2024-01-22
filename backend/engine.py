from dotenv import load_dotenv
import os

load_dotenv()
db_username = os.environ.get("DB_USERNAME")
db_password = os.environ.get("DB_PASSWORD")
api_password = os.environ.get("API_PASSWORD")

def get_creds():
    return api_password