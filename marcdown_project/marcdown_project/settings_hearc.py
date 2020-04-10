from .settings import *

# Override DEBUG
DEBUG = False

# Extend ALLOWED_HOSTS
ALLOWED_HOSTS += ['marcdown.srvz-webapp.he-arc.ch']

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': os.environ.get('GROUPNAME'),
    'USER': os.environ.get('GROUPNAME', 'root'),
    'PASSWORD': os.environ.get('PASSWORD', ''),
    'HOST': os.environ.get('MYSQL_HOST', 'localhost'),
    'PORT': os.environ.get('MYSQL_PORT', '3306'),
    'OPTIONS': {
      'charset': 'utf8mb4'
    }
  }
}

# Define STATIC_ROOT
STATIC_ROOT = '/var/www/app/public/static'
