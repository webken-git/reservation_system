from django.db import models
from users.models import User

# Create your models here.


class AppSettings(models.Model):
  user = models.OneToOneField(User, verbose_name='app_settings_user', related_name='app_settings_user', on_delete=models.CASCADE)
  is_receive_announcement_email = models.BooleanField(default=True)
  is_receive_reminder_email = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class AutoMail(models.Model):
  """
  自動送信メールの件名・本文を管理するモデル
  """
  name = models.CharField(verbose_name='auto_mail_name', max_length=255)
  subject = models.CharField(verbose_name='auto_mail_subject', max_length=255)
  body = models.TextField(verbose_name='auto_mail_body')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
