"""
Django settings for config project.
Generated by 'django-admin startproject' using Django 3.1.7.
For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from corsheaders.defaults import default_headers
from datetime import timedelta  # 追加
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = os.path.basename(BASE_DIR)  # 追加
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/


# ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    # Local
    'announcements',
    'app_settings',
    'application_documents',
    'business_diary',
    'reservations',
    'questionnaire',
    'users',

    # 3rd party
    'rest_framework',
    # 'rest_framework.authtoken',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'phonenumber_field',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'config.urls'

FRONTEND_SITE_DOMAIN = 'http://localhost:3000'
# PASSWORD_RESET_URL = FRONTEND_SITE_DOMAIN + '/account/password/reset/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'templates', 'allauth'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

REDIS_HOST = os.environ.get('REDIS_HOST', '127.0.0.1')
REDIS_PORT = os.environ.get('REDIS_PORT', '6379')

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://{}:{}/api".format(REDIS_HOST, REDIS_PORT),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        }
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# MEDIA_URL = '/media/'
AUTH_USER_MODEL = 'users.User'

# Session Config
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # ブラウザを閉じてもセッションを破棄しない
SESSION_COOKIE_AGE = 86400  # 1日経ったら強制的にセッションタイムアウト

# DRF settings

REST_FRAMEWORK = {
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S",
    # 'DEFAULT_PAGINATION_CLASS': 'reservations.funcs.paginations.CustomPagination',
    # 'PAGE_SIZE': 20,

    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    # ],

    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        # 'config.funcs.authentication.CookieHandlerJWTAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    # トークンをJWTに設定
    'AUTH_HEADER_TYPES': ('JWT',),
    # アクセストークンの持続時間の設定
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    # リフレッシュトークンの持続時間の設定
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # 'BLACKLIST_AFTER_ROTATION': False,
}

SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True


# dj-rest-auth settings

REST_AUTH_SERIALIZERS = {
    # 'LOGIN_SERIALIZER': 'users.signin.serializers.LoginSerializer',
    'PASSWORD_RESET_SERIALIZER': 'users.serializers.PasswordResetSerializer',
}

CSRF_COOKIE_NAME = 'csrftoken'
# CSRF_USE_SESSIONS = True

# REST_SESSION_LOGIN = True

REST_USE_JWT = True
JWT_AUTH_COOKIE = 'jwt-auth'
OLD_PASSWORD_FIELD_ENABLED = False
# httpsでのリクエストでないとCookieを送信しない(デフォルトはfalse。本番でTrueにする)
JWT_AUTH_SECURE = False
# JWT_AUTH_SAMESITE = 'None'
# JWTクッキーを認証に使用する際にDRFで無効になっているCSRFチェックを有効にする。
# JWT_AUTH_COOKIE_ENFORCE_CSRF_ON_UNAUTHENTICATED = True


# django-allauth settings
AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
    # 'django.contrib.auth.backends.AllowAllUsersModelBackend',
]


ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_ADAPTER = 'users.adapter.MyAccountAdapter'
# サインアップ時に確認メールを送信する
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
# サインアップ時の確認メールに記載するログインページのURL
LOGIN_URL = '/account/login'
# EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = ''
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
SITE_ID = 1


# CORS settings

CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = True

# CORS_ORIGIN_WHITELIST = [
#     'http://localhost:3000',
#     'http://127.0.0.1:3000',
# ]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]


CSRF_TRUSTED_ORIGINS = [
    'localhost:3000',
    '127.0.0.1',
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    'X-CSRFToken',
    # 'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
]
