#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv


def main():
  """Run administrative tasks."""
  # .envの読み込み
  load_dotenv()

  if os.getenv('ENV') == "LOCAL":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.local_settings')
  elif os.getenv('ENV') == "STAGING":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.staging_settings')
#   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.local_settings')
  try:
    from django.core.management import execute_from_command_line
  except ImportError as exc:
    raise ImportError(
        "Couldn't import Django. Are you sure it's installed and "
        "available on your PYTHONPATH environment variable? Did you "
        "forget to activate a virtual environment?"
    ) from exc
  execute_from_command_line(sys.argv)


if __name__ == '__main__':
  main()
