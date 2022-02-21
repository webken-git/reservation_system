from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import response, viewsets, status, mixins
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from app_settings.models import AppSettings, AutoMail
from app_settings.serializers import AppSettingsSerializer, AutoMailSerializer, SendMailSerializer
from users import permissions
from users.models import User

# キャッシュの期限
TIME_OUTS_5MINUTES = 60 * 5  # 5分
TIME_OUTS_30MINUTES = 60 * 30  # 30分


class AppSettingsViewSet(viewsets.ModelViewSet):
  queryset = AppSettings.objects.all()
  serializer_class = AppSettingsSerializer
  filter_fields = [f.name for f in AppSettings._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: ['update', 'partial_update', 'destroy', 'list', 'retrieve'],
      permissions.AllowAny: ['create']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_30MINUTES))
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


class AutoMailViewSet(viewsets.ModelViewSet):
  queryset = AutoMail.objects.all()
  serializer_class = AutoMailSerializer
  filter_fields = [f.name for f in AutoMail._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy', 'list', 'retrieve'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: []
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_30MINUTES))
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


class SendMailViewSet(
        mixins.CreateModelMixin,
        viewsets.GenericViewSet):
  """
  件名と本文を指定して全ユーザーにメールを送信する
  """
  queryset = AutoMail.objects.all()
  serializer_class = SendMailSerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['create'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: []
  }

  @extend_schema(
      parameters=[
          OpenApiParameter(
              name='subject',
              location=OpenApiParameter.QUERY,
              type=OpenApiTypes.STR,
              description='件名',
              required=True,
          ),
          OpenApiParameter(
              name='body',
              type=OpenApiTypes.STR,
              location=OpenApiParameter.QUERY,
              description='本文',
              required=True,
          )
      ]
  )
  def create(self, request, *args, **kwargs):
    from django.conf import settings
    from django.template.loader import render_to_string
    from django.core.mail import EmailMessage
    import os
    from dotenv import load_dotenv
    load_dotenv()

    subject = request.data.get('subject')
    body = request.data.get('body')
    from_email = os.getenv('EMAIL_HOST_USER')
    to_email = [user.email for user in User.objects.all()]
    file_path = settings.BASE_DIR + '/templates/reservations/email/send_mail_message.txt'

    if not subject or not body:
      return response.Response(
          {'message': 'subject or body is empty'},
          status=status.HTTP_400_BAD_REQUEST
      )
    body = body.replace('\r\n', '\n')
    with open(file_path, 'w', encoding='utf-8') as f:
      f.write(body)

    for e in to_email:
      email = EmailMessage(
          subject=subject,
          body=render_to_string("reservations/email/send_mail_message.txt"),
          from_email=from_email,
          to=[e],
      )
      # email.content_subtype = 'html'
      email.send()

    return response.Response({'message': 'メールを送信しました'}, status=status.HTTP_200_OK)
