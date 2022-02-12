from importlib.resources import path
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers, exceptions
from dj_rest_auth.serializers import LoginSerializer
from .models import User
from app_settings.models import AppSettings
if 'allauth' in settings.INSTALLED_APPS:
  from users.forms import AllAuthPasswordResetForm


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

  # create時に、AppSettingsを作成する
  # def create(self, validated_data):
  #   user = super().create(validated_data)
  #   AppSettings.objects.create(user=user)
  #   return user


class CustomPasswordResetSerializer(serializers.Serializer):
  email = serializers.EmailField()
  path = serializers.CharField()

  reset_form = None

  @property
  def password_reset_form_class(self):
    if 'allauth' in settings.INSTALLED_APPS:
      return AllAuthPasswordResetForm
    else:
      return PasswordResetForm

  def validate_email(self, value):
    self.reset_form = PasswordResetForm({'email': value})
    if not self.reset_form.is_valid():
      raise serializers.ValidationError(_('Error'))
    return value

  def get_email_options(self):
    """Override this method to change default e-mail options"""
    return {}

  def validate_email(self, value):
    # Create PasswordResetForm with the serializer
    self.reset_form = self.password_reset_form_class(data=self.initial_data)
    if not self.reset_form.is_valid():
      raise serializers.ValidationError(self.reset_form.errors)

    return value

  def save(self):
    if 'allauth' in settings.INSTALLED_APPS:
      from allauth.account.forms import default_token_generator
    else:
      from django.contrib.auth.tokens import default_token_generator
    request = self.context.get('request')
    opts = {
        'use_https': request.is_secure(),
        'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
        'request': request,
        'token_generator': default_token_generator,
        'email_template_name': 'registration/password_reset_email.txt',
        'extra_email_context': {
            'path': self.initial_data['path']
        }
    }
    # opts.update(self.get_email_options())
    self.reset_form.save(**opts)


# class LoginSerializer(LoginSerializer):
#   username = None


class StaffLoginSerializer(LoginSerializer):
  def validate_auth_user_status(self, user):
    if not user.is_staff:
      msg = _('This user account is not authorized.')
      raise exceptions.ValidationError(msg)


class SuperUserLoginSerializer(LoginSerializer):
  def validate_auth_user_status(self, user):
    if not user.is_superuser:
      msg = _('This user account is not authorized.')
      raise exceptions.ValidationError(msg)
