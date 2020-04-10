from .settings import *

# Override DEBUG
DEBUG = False

# Extend ALLOWED_HOSTS
ALLOWED_HOSTS += ['marcdown.srvz-webapp.he-arc.ch']

# Redefine DATABASES
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Define STATIC_ROOT
STATIC_ROOT = '/var/www/app/public/static'
