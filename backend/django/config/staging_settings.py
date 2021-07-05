from .settings import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG')

SECRET_KEY = os.environ.get('SECRET_KEY')

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'reservationSystem',
        'USER': os.environ.get('USER'),
        'PASSWORD': 'password',
        'HOST': os.environ.get('HOST'),
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'ATOMIC_REQUESTS': True,    # トランザクション処理の設定
    }
}

EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_PORT = 1025
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = False
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# サインアップ時の確認メールに記載するログインページのURL
LOGIN_URL = 'http://127.0.0.1:8080/api/users/login'
