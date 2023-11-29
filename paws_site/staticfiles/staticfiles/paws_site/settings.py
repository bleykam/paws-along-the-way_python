"""
Django settings for paws_pages project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from datetime import timedelta
from pathlib import Path
import os
from decouple import config
import django_vite



# Build paths inside the project like this: BASE_DIR / 'subdir'.
#BD /home/brittany/PycharmProjects/pythonProject12/paws_site
BASE_DIR = Path(__file__).resolve().parent.parent



BASE_FRONTEND_URL = os.environ.get('DJANGO_BASE_FRONTEND_URL', default='http://localhost:5173')
BACKEND_URL='http://localhost:8000'

#Google OAUTH Information
GOOGLE_CLIENT_ID = config('GOOGLE_OAUTH2_CLIENT_ID')
GOOGLE_CLIENT_SECRET = config('GOOGLE_OAUTH2_CLIENT_SECRET')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5t8f2qnla8^u5usm#7!(!6^rx#5dny*$=t+sv3lg&66e(tje@0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
AUTH_USER_MODEL = 'paws_server.User'
LOGIN_REDIRECT_URL='http://localhost:5173/'

CSRF_COOKIE_SAMESITE = 'None'
CSRF_USE_SESSIONS = True

ALLOWED_HOSTS = ['*', 'http://localhost:3000', 'http://localhost:5173','http://localhost:' ]
CSRF_COOKIE_DOMAIN =  ['http://localhost:3000','http://localhost:5173', 'http://localhost:', "http://127.0.0.1:8000",'http://127.0.0.1',]
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000','http://localhost:5173', 'http://localhost:', "http://127.0.0.1:8000",'http://127.0.0.1',]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    'http://localhost:5173',
    'http://localhost:' ,
    'http://127.0.0.1:5173',
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    'http://localhost:8000'
]


CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    'http://localhost:5173',
    'http://localhost:' ,
    'http://127.0.0.1:5173',
    "http://127.0.0.1:8000",
    'http://localhost:8000'
]

SESSION_COOKIE_SAMESITE = None


DEFAULT_APPS = [
    'django_vite',
    'daphne',
    'channels',
    'selenium',
    'django_filters',
    'oauth2_provider',
    'rest_framework_simplejwt',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
CUSTOM_APPS=[
    'paws_server',
    'chatapp'   
]


INSTALLED_APPS =  DEFAULT_APPS + CUSTOM_APPS 

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]


ROOT_URLCONF = 'paws_site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'paws_client', 'dist'), os.path.join(BASE_DIR, 'templates'), os.path.join(BASE_DIR, 'paws_client') ],
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


WSGI_APPLICATION = 'paws_site.wsgi.application'
ASGI_APPLICATION = 'paws_site.asgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "OPTIONS": {
            "read_default_file": os.path.join(BASE_DIR, 'my.cnf'),
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        },
        "TEST": {
            "NAME": BASE_DIR / "test_db.sqlite3",
        },
    },

}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_TZ = True


##VITE SETTINGS
# settings.py


DJANGO_VITE_ASSETS_PATH = os.path.join(BASE_DIR, 'paws_client', 'dist')
DJANGO_VITE_DEV_SERVER_PORT = 5173
DJANGO_VITE_DEV_MODE=False



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

#static files are served from these directories during develpment
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'paws_client', 'dist'), os.path.join(BASE_DIR, 'paws_client', 'src'), DJANGO_VITE_ASSETS_PATH, BASE_DIR]
#static files are collected and stored here for production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTStatelessUserAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ),
       'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
}


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}



SESSION_ENGINE="django.contrib.sessions.backends.db"


AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.RemoteUserBackend",
    "django.contrib.auth.backends.ModelBackend"
]


