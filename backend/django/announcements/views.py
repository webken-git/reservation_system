from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework import response, viewsets, status
from announcements.models import Announcement
from announcements.serializers import AnnouncementSerializer
from questionnaire.models import Questionnaire
from app_settings.models import AppSettings
from users import permissions
import os
from dotenv import load_dotenv


# キャッシュの期限
TIME_OUTS_5MINUTES = 60 * 5  # 5分
TIME_OUTS_30MINUTES = 60 * 30  # 30分
TIME_OUTS_1DAY = 60 * 60 * 24  # 1日


class AnnouncementViewSet(viewsets.ModelViewSet):
  queryset = Announcement.objects.all()
  serializer_class = AnnouncementSerializer
  filter_fields = [f.name for f in Announcement._meta.fields]
  filter_fields += ['questionnaire__' + f.name for f in Questionnaire._meta.fields]
  # permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1DAY))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1DAY))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

  def perform_create(self, serializer):
    serializer.save()
    # is_receive_announcement_emailがTrueのユーザーにメールを送信する
    users = AppSettings.objects.filter(is_receive_announcement_email=True)
    # questionnaire = Questionnaire.objects.get(pk=serializer.data['questionnaire'])
    load_dotenv()
    for user in users:
      # メール送信
      context = {
          'email': user.user.email,
      }
      message = serializer.data['description'] + "\n\n--\n稚内市みどりスポーツパーク\nhttps://wmsp.info/\n\n■お問い合わせ先\nEMAIL: info@wmsp.info\nTEL: 0162-73-4125"

      email = EmailMessage(
          subject=serializer.data['title'],
          body=message,
          from_email=os.getenv('EMAIL_HOST_USER'),
          to=[user.user.email],
      )
      email.send()
    return serializer
