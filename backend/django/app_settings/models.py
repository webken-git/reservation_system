from django.db import models
from users.models import User

# Create your models here.


class AppSettings(models.Model):
  user = models.OneToOneField(User, verbose_name='app_settings_user', related_name='app_settings_user', on_delete=models.CASCADE)
  is_receive_announcement_email = models.BooleanField(default=True)
  is_receive_reminder_email = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
