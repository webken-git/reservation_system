
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from app_settings.models import AutoMail

if 'allauth' in settings.INSTALLED_APPS:
  from allauth.account import app_settings
  from allauth.account.adapter import get_adapter
  from allauth.account.forms import \
      ResetPasswordForm as DefaultPasswordResetForm
  from allauth.account.forms import default_token_generator
  from allauth.account.utils import (filter_users_by_email,
                                     user_pk_to_url_str, user_username)
  # from allauth.utils import build_absolute_uri


class AllAuthPasswordResetForm(DefaultPasswordResetForm):
  def clean_email(self):
    """
    ユーザーがリークするため、無効なEメールはエラーを発生させないでください。
    単体テストの場合：test_password_reset_with_invalid_email.
    """
    email = self.cleaned_data["email"]
    email = get_adapter().clean_email(email)
    self.users = filter_users_by_email(email, is_active=True)
    return self.cleaned_data["email"]

  def save(self, request, **kwargs):
    """
    パスワードリセットのメールを送信。
    """
    password_reset = AutoMail.objects.get(name="パスワードリセットメール")
    file_path = settings.BASE_DIR + '/templates/registration/password_reset_email.txt'
    password_reset.body = password_reset.body.replace('\r\n', '\n')
    # ファイルに書き込み
    with open(file_path, 'w', encoding='utf-8') as f:
      f.write(password_reset.body)
    current_site = get_current_site(request)

    from_email = settings.EMAIL_HOST_USER
    subject = password_reset.subject
    to_email = self.cleaned_data['email']
    token_generator = kwargs.get('token_generator', default_token_generator)

    for user in self.users:

      uid = user_pk_to_url_str(user)
      temp_key = token_generator.make_token(user)

      # send the password reset email
      # path = reverse(
      #     'password_reset_confirm',
      #     args=[uid, temp_key],
      # )
      # url = settings.FRONTEND_SITE_DOMAIN + path
      # url = build_absolute_uri(request, path)

      # リクエストされたサイトのドメインを取得
      protocol = request.data['protocol']
      domain = request.data['domain']
      path = request.data['path']

      context = {
          'current_site': current_site,
          'user': user,
          # 'password_reset_url': url,
          'request': request,
          'uid': uid,
          'token': temp_key,
          'protocol': protocol,
          'domain': domain,
          'path': path,
      }
      if app_settings.AUTHENTICATION_METHOD != app_settings.AuthenticationMethod.EMAIL:
        context['username'] = user_username(user)
      email = EmailMessage(
          subject=subject,
          body=render_to_string('registration/password_reset_email.txt', context),
          from_email=from_email,
          to=[to_email]
      )
      email.send()
    return self.cleaned_data['email']
