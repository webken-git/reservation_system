"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
from dotenv import load_dotenv

from django.core.wsgi import get_wsgi_application
import pymysql
pymysql.install_as_MySQLdb()

load_dotenv()

if os.getenv('ENV') == "LOCAL":
  os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.local_settings')
elif os.getenv('ENV') == "STAGING":
  os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.staging_settings')

#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.local_settings')

application = get_wsgi_application()
