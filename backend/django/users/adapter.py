from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from allauth.account.adapter import DefaultAccountAdapter
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from app_settings.models import AutoMail


class MyAccountAdapter(DefaultAccountAdapter):
  def get_email_confirmation_url(self, request, emailconfirmation):
    protocol = request.POST.get('protocol')
    domain = request.POST.get('domain')
    return '{}//{}/registration/complete/{}/'.format(protocol, domain, emailconfirmation.key)

  def send_mail(self, template_prefix, email, context):
    # メールテンプレートを取得
    auto_mail = AutoMail.objects.get(name="アカウント登録の本人確認メール")
    file_path = settings.BASE_DIR + '/templates/allauth/account/email/email_confirmation.txt'
    body = auto_mail.body.replace('\r\n', '\n')
    # ファイルに書き込み
    with open(file_path, 'w', encoding='utf-8') as f:
      f.write(body)
    url = context['activate_url']
    contexts = {
        'user': context['user'],
        'url': url,
    }
    # メール送信
    mail = EmailMessage(
        subject=auto_mail.subject,
        body=render_to_string('allauth/account/email/email_confirmation.txt', contexts),
        from_email=settings.EMAIL_HOST_USER,
        to=[email],
    )
    mail.send()
