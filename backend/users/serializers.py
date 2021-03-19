from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'


class PasswordResetSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password_reset_form_class = PasswordResetForm

  def validate_email(self, value):
    self.reset_form = self.password_reset_form_class(data=self.initial_data)
    if not self.reset_form.is_valid():
      raise serializers.ValidationError(_('Error'))

    if not User.objects.filter(email=value).exists():

      raise serializers.ValidationError(_('Invalid e-mail address'))
    return value

  def save(self):
    request = self.context.get('request')
    opts = {
        'use_https': request.is_secure(),
        'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
        'request': request,
        'html_email_template_name': 'password_reset_email.html',
    }
    self.reset_form.save(**opts)
