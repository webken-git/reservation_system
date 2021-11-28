from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractUser, BaseUserManager
# from app_settings.models import AppSettings


class CustomUserManager(BaseUserManager):

  use_in_migrations = True

  def create_user(self, email, password, **extra_fields):
    if not email:
      raise ValueError('メールアドレスは必須項目です。')

    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, password, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    if extra_fields.get('is_staff') is not True:
      raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
      raise ValueError('Superuser must have is_superuser=True.')
    return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
  email = models.EmailField('email', max_length=100, unique=True)

  username = None
  first_name = None
  last_name = None
  date_joined = None

  is_staff = models.BooleanField(
      ('staff status'),
      default=False,
      help_text=(
          'Designates whether the user can log into this admin site.'),
  )

  is_active = models.BooleanField(
      ('active'),
      default=True,
      help_text=(
          'Designates whether this user should be treated as active. '
          'Unselect this instead of deleting accounts.'
      ),
  )

  is_superuser = models.BooleanField(
      ('superuser status'),
      default=False,
      help_text=(
          'Designates that this user has all permissions without '
          'explicitly assigning them.'
      ),
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = CustomUserManager()

  # EMAIL_FIELD = 'email'
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  class Meta:
    db_table = "users"

  def email_user(self, subject, message, from_email=None, **kwargs):
    """Send an email to this user."""
    send_mail(subject, message, from_email, [self.email], **kwargs)
