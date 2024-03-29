from django.db.models.aggregates import Count
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from rest_framework import viewsets, response, status, mixins
# from rest_framework.decorators import action
from django_filters import rest_framework as filters
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
import pytz
import datetime
import os
from dotenv import load_dotenv
from users import permissions
from users.models import User
from reservations.models import *
from reservations.serializers import *
from reservations.funcs.filters import (
    ReservationFilter,
    ApprovalApplicationFilter, ApprovalFilter
)
from reservations.funcs.csv import csv_export
from app_settings.models import AutoMail
from documents.views import create_new_word
# from docx2pdf import convert
# import pythoncom
from documents.models import Document


# データの変更が頻繫にあるAPIのキャッシュの期限は5分
TIME_OUTS_5MINUTES = 60 * 5
TIME_OUTS_1HOUR = 60 * 60
# UserInfoなどのデータ変更はあまりないAPIのキャッシュの期限は1日
TIME_OUTS_1DAY = 60 * 60 * 24
# マスターデータのキャッシュの期限は30日
TIME_OUTS_1MONTH = TIME_OUTS_1DAY * 30

# Create your views here.


class ReservationSuspensionScheduleViewSet(viewsets.ModelViewSet):
  queryset = ReservationSuspensionSchedule.objects.all()
  serializer_class = ReservationSuspensionScheduleSerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1HOUR))
  def list(self, request, *args, **kwargs):
    start = request.query_params.get('start', None)
    place_id = request.query_params.get('places__id', None)
    place_name = request.query_params.get('places__name', None)
    if start and place_id:
      queryset = self.queryset.filter(
          places__id=place_id
      )
      for item in queryset:
        if str(item.start.strftime('%Y-%m-%d')) <= start <= str(item.end.strftime('%Y-%m-%d')):
          serializer = self.get_serializer(item)
          return response.Response([serializer.data])
      return response.Response([], status=status.HTTP_204_NO_CONTENT)
    elif start and place_name:
      queryset = self.queryset.filter(
          places__name=place_name
      )
      for item in queryset:
        if str(item.start.strftime('%Y-%m-%d')) <= start <= str(item.end.strftime('%Y-%m-%d')):
          serializer = self.get_serializer(item)
          return response.Response([serializer.data])
      return response.Response([], status=status.HTTP_204_NO_CONTENT)
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1HOUR))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ApprovalViewSet(viewsets.ModelViewSet):
  queryset = Approval.objects.all()
  serializer_class = ApprovalSerializer
  filter_fields = [f.name for f in Approval._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceViewSet(viewsets.ModelViewSet):
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer
  filter_fields = [f.name for f in Place._meta.fields]
  # permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentViewSet(viewsets.ModelViewSet):
  queryset = Equipment.objects.all()
  serializer_class = EquipmentSerializer
  filter_fields = [f.name for f in Equipment._meta.fields]
  filter_fields += ['place__' + f.name for f in Place._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationViewSet(viewsets.ModelViewSet):
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer
  # filter_fields = [f.name for f in Reservation._meta.fields]
  filter_backends = [filters.DjangoFilterBackend]
  filter_class = ReservationFilter
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: ['update', 'partial_update', 'create'],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def create(self, request, *args, **kwargs):
    schedules = ReservationSuspensionSchedule.objects.filter(
        places__id=request.data['place_id'],
    )
    # schedulesが空ならば、予約可能
    if not schedules:
      return super().create(request, *args, **kwargs)
    for schedule in schedules:
      if str(schedule.start) <= request.data['start'] <= str(schedule.end):
        return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
      elif str(schedule.start) <= request.data['end'] <= str(schedule.end):
        return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
    return super().create(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UserInfoViewSet(viewsets.ModelViewSet):
  queryset = UserInfo.objects.all()
  serializer_class = UserInfoSerializer
  filter_fields = [f.name for f in UserInfo._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: ['list', 'retrieve', 'update', 'partial_update', 'create', 'destroy'],
      permissions.AllowAny: []
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1DAY))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1DAY))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


def extract_date(entity):
  'extracts the starting date from an entity'
  return entity.reservation.start.date()


class ReserveCheckViewSet(viewsets.ReadOnlyModelViewSet):
  """
  予約手続きの際、予約可能かどうかをチェックするAPI
  承認済みの予約データと日付が重複している場合は、予約不可
  """
  queryset = ApprovalApplication.objects.all()
  serializer_class = ApprovalApplicationSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    now = str(datetime.datetime.now(pytz.timezone('Asia/Tokyo')).strftime('%Y-%m-%dT%H:%M'))
    queryset = super().get_queryset()
    queryset = queryset.filter(approval=2, reservation__start__gte=now)
    return queryset

  def list(self, request, *args, **kwargs):
    start = request.query_params.get('reservation__start', None)
    end = request.query_params.get('reservation__end', None)
    place = request.query_params.get('reservation__place', None)
    place_number = request.query_params.get('reservation__place_number', None)
    if start and end and place and place_number == 0:
      queryset = self.get_queryset().filter(reservation__place=place)
      for entity in queryset:
        if str(entity.reservation.start - datetime.timedelta(hours=1)) <= start <= str(entity.reservation.end + datetime.timedelta(hours=1)):
          return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
        elif str(entity.reservation.start - datetime.timedelta(hours=1)) <= end <= str(entity.reservation.end + datetime.timedelta(hours=1)):
          return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
      return super().list(request, *args, **kwargs)
    elif start and end and place and place_number > "0":
      counter = 0
      queryset = self.get_queryset().filter(reservation__place=place)
      for entity in queryset:
        if str(entity.reservation.start - datetime.timedelta(hours=1)) <= start <= str(entity.reservation.end + datetime.timedelta(hours=1)) or str(entity.reservation.start - datetime.timedelta(hours=1)) <= end <= str(entity.reservation.end + datetime.timedelta(hours=1)):
          counter += entity.reservation.place_number
          # print(counter)
          # counterがentity.reservation.place.maxを超えたら予約不可
          if counter >= entity.reservation.place.max:
            return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
      return super().list(request, *args, **kwargs)
    else:
      return super().list(request, *args, **kwargs)

  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class SuspentionCheckViewSet(viewsets.ReadOnlyModelViewSet):
  """
  予約手続きの際、予約可能かどうかをチェックするAPI
  予約停止期間と日付が重複している場合は、予約不可
  """
  queryset = ReservationSuspensionSchedule.objects.all()
  serializer_class = ReservationSuspensionScheduleSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filter_fields = [f.name for f in ReservationSuspensionSchedule._meta.fields]
  filter_fields += ['places__' + f.name for f in Place._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    now = str(datetime.datetime.now(pytz.timezone('Asia/Tokyo')).strftime('%Y-%m-%dT%H:%M'))
    queryset = super().get_queryset()
    queryset = queryset.filter(start__gte=now)
    return queryset

  def list(self, request, *args, **kwargs):
    start = request.query_params.get('start', None)
    end = request.query_params.get('end', None)
    place_id = request.query_params.get('places__id', None)
    if start and end and place_id:
      queryset = self.get_queryset().filter(places__id=place_id)
      for entity in queryset:
        if str(entity.start - datetime.timedelta(hours=1)) <= start <= str(entity.end + datetime.timedelta(hours=1)):
          return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
        elif str(entity.start - datetime.timedelta(hours=1)) <= end <= str(entity.end + datetime.timedelta(hours=1)):
          return response.Response({'error': {'入力された日時は予約できません。'}}, status=status.HTTP_400_BAD_REQUEST)
      return super().list(request, *args, **kwargs)
    else:
      return super().list(request, *args, **kwargs)


class ApprovalApplicationViewSet(viewsets.ModelViewSet):
  queryset = ApprovalApplication.objects.all()
  serializer_class = ApprovalApplicationSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filter_class = ApprovalApplicationFilter
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: ['partial_update', 'update', 'create'],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)

  def create(self, request, *args, **kwargs):
    if ApprovalApplication.objects.filter(reservation=request.data['reservation_id']).exists():
      return response.Response({'error': 'リクエストされたreservation_idが追加されているデータが既に存在しています。'}, status=status.HTTP_400_BAD_REQUEST)
    else:
      super().create(request, *args, **kwargs)
      data = ApprovalApplication.objects.filter(reservation__id=request.data['reservation_id'], approval__id=request.data['approval_id'])
      # 予約手続き完了メール送信
      automail = AutoMail.objects.get(name='予約手続き完了メール')
      file_path = settings.BASE_DIR + '/templates/reservations/email/reservation_complete_message.txt'
      # automail.bodyのCRLFの改行コードをLFに変換
      automail.body = automail.body.replace('\r\n', '\n')
      # ファイルに書き込み
      with open(file_path, 'w', encoding='utf-8') as f:
        f.write(automail.body)

      """送信元メールアドレス"""
      load_dotenv()
      from_email = os.getenv('EMAIL_HOST_USER')

      """宛先メールアドレス"""
      to_email = data[0].reservation.user.email
      context = {
          "reservation": {
              "contact_name": data[0].reservation.contact_name,
              "tel": data[0].reservation.tel,
              "place": data[0].reservation.place.name,
              "start": data[0].reservation.start.strftime('%Y年%#m月%d日 %H:%M'),
              "end": data[0].reservation.end.strftime('%H:%M'),
          },
      }

      # メール送信
      email = EmailMessage(
          subject=automail.subject,
          body=render_to_string("reservations/email/reservation_complete_message.txt", context),
          from_email=from_email,
          to=[to_email],
          bcc=[from_email]
      )
      email.send()
      return response.Response(ApprovalApplicationSerializer(data[0]).data, status=status.HTTP_200_OK)

  def partial_update(self, request, *args, **kwargs):
    data = ApprovalApplication.objects.filter(reservation=request.data['reservation_id'])

    """送信元メールアドレス"""
    load_dotenv()
    from_email = os.getenv('EMAIL_HOST_USER')

    """宛先メールアドレス"""
    to_email = data[0].reservation.user.email
    context = {
        "reservation": {
            "contact_name": data[0].reservation.contact_name,
            "tel": data[0].reservation.tel,
            "place": data[0].reservation.place.name,
            "start": data[0].reservation.start.strftime('%Y年%#m月%d日 %H:%M'),
            "end": data[0].reservation.end.strftime('%H:%M'),
        },
    }

    if request.data['approval_id'] == 2:
      # 承認された場合
      # 承認通知書を発行する場合
      approval_reserve = ApprovalApplication.objects.filter(approval=2, reservation__place__id=data[0].reservation.place.id)
      request_place_number = data[0].reservation.place_number
      request_start = data[0].reservation.start
      request_end = data[0].reservation.end
      max = data[0].reservation.place.max
      counter = 0
      for i in approval_reserve:
        # 承認された予約が同じ場所で、開始時間や終了時間が重複していないかチェック
        if str(i.reservation.start - datetime.timedelta(hours=1)) <= str(request_start) <= str(i.reservation.end + datetime.timedelta(hours=1)) or str(i.reservation.start - datetime.timedelta(hours=1)) <= str(request_end) <= str(i.reservation.end + datetime.timedelta(hours=1)):
          # 重複している場合
          counter += i.reservation.place_number
          # 予約数が最大数を超えている場合
          if counter + request_place_number > max:
            return response.Response({'error': '※予約可能なシート数の上限を超えているため、承認できませんでした。'}, status=status.HTTP_400_BAD_REQUEST)
      # この時点でデータ更新する
      super().partial_update(request, *args, **kwargs)

      if request.data['is_issued'] is True:
        # pythoncom.CoInitialize()
        BASE_DIR = settings.BASE_DIR
        file, file_name = create_new_word(self.request)
        word = '{}/static/documents/docx/{}'.format(BASE_DIR, file)
        # pdf = '{}/static/documents/pdf/{}'.format(BASE_DIR, file).replace('.docx', '.pdf')
        # Documentテーブルに登録
        document = Document(
            number=self.request.data['number'],
            file=file,
            file_name=file_name,
            approval_application_id=self.request.data['approval_application_id']
        )
        document.save()
      # メール送信をする場合
      if request.data['is_send_mail'] is True:
        # 予約承認メール送信
        automail = AutoMail.objects.get(name='予約承認メール')
        file_path = settings.BASE_DIR + '/templates/reservations/email/reservation_approval_message.txt'
        # automail.bodyのCRLFの改行コードをLFに変換
        automail.body = automail.body.replace('\r\n', '\n')
        # ファイルに書き込み
        with open(file_path, 'w', encoding='utf-8') as f:
          f.write(automail.body)
        # メール送信
        email = EmailMessage(
            subject=automail.subject,
            body=render_to_string("reservations/email/reservation_approval_message.txt", context),
            from_email=from_email,
            to=[to_email],
            bcc=[from_email]
        )
        if request.data['is_issued'] is True:
          # wordファイルをpdfに変換
          # f = open(pdf, 'w')
          # f.close()
          # convert(word, pdf)
          # 承認通知書を発行している場合は、添付ファイルを追加
          email.attach_file(word)
          email.send()
        else:
          email.send()
      # メール送信後にファイルを削除
      # if request.data['is_issued'] is True and request.data['is_send_mail'] is True:
        # os.remove(pdf)
        # pythoncom.CoUninitialize()

    elif request.data['approval_id'] == 3:
      # 予約が不承認された場合
      # データ更新する
      super().partial_update(request, *args, **kwargs)
      if request.data['is_issued'] is True:
        # pythoncom.CoInitialize()
        BASE_DIR = settings.BASE_DIR
        file, file_name = create_new_word(self.request)
        word = '{}/static/documents/docx/{}'.format(BASE_DIR, file)
        # pdf = '{}/static/documents/pdf/{}'.format(BASE_DIR, file).replace('.docx', '.pdf')
        # Documentテーブルに登録
        document = Document(
            number=self.request.data['number'],
            file=file,
            file_name=file_name,
            approval_application_id=self.request.data['approval_application_id']
        )
        document.save()
      # メール送信をする場合
      if request.data['is_send_mail'] is True:
        # 予約承認メール送信
        automail = AutoMail.objects.get(name='予約不承認メール')
        file_path = settings.BASE_DIR + '/templates/reservations/email/reservation_unapproval_message.txt'
        # automail.bodyのCRLFの改行コードをLFに変換
        automail.body = automail.body.replace('\r\n', '\n')
        # ファイルに書き込み
        with open(file_path, 'w', encoding='utf-8') as f:
          f.write(automail.body)
        # メール送信
        email = EmailMessage(
            subject=automail.subject,
            body=render_to_string("reservations/email/reservation_unapproval_message.txt", context),
            from_email=from_email,
            to=[to_email],
            bcc=[from_email]
        )
        if request.data['is_issued'] is True:
          # wordファイルをpdfに変換
          # f = open(pdf, 'w')
          # f.close()
          # convert(word, pdf)
          # 承認通知書を発行している場合は、添付ファイルを追加
          email.attach_file(word)
          email.send()
        else:
          email.send()
      # メール送信後にファイルを削除
      # if request.data['is_issued'] is True and request.data['is_send_mail'] is True:
        # os.remove(pdf)
        # pythoncom.CoUninitialize()
    elif User.objects.get(email=request.user).is_staff is True and request.data['approval_id'] == 4:
      # 施設側からキャンセルされた場合
      # データ更新する
      super().partial_update(request, *args, **kwargs)
      # 施設側からのキャンセルメール送信
      automail = AutoMail.objects.get(name='施設側からのキャンセルメール')
      file_path = settings.BASE_DIR + '/templates/reservations/email/facility_side_cancel_message.txt'
      # automail.bodyのCRLFの改行コードをLFに変換
      automail.body = automail.body.replace('\r\n', '\n')
      # ファイルに書き込み
      with open(file_path, 'w', encoding='utf-8') as f:
        f.write(automail.body)
      # メール送信
      email = EmailMessage(
          subject=automail.subject,
          body=render_to_string("reservations/email/facility_side_cancel_message.txt", context),
          from_email=from_email,
          to=[to_email],
          bcc=[from_email]
      )
      email.send()
    elif User.objects.get(email=request.user).is_staff is False and request.data['approval_id'] == 4:
      # 利用者側からキャンセルされた場合
      # データ更新する
      super().partial_update(request, *args, **kwargs)
      # 利用者側からのキャンセルメール送信
      automail = AutoMail.objects.get(name='利用者側からのキャンセルメール')
      file_path = settings.BASE_DIR + '/templates/reservations/email/user_side_cancel_message.txt'
      # automail.bodyのCRLFの改行コードをLFに変換
      automail.body = automail.body.replace('\r\n', '\n')
      # ファイルに書き込み
      with open(file_path, 'w', encoding='utf-8') as f:
        f.write(automail.body)
      # メール送信
      email = EmailMessage(
          subject=automail.subject,
          body=render_to_string("reservations/email/user_side_cancel_message.txt", context, request),
          from_email=from_email,
          to=[to_email],
          bcc=[from_email]
      )
      email.send()
    else:
      pass
    return response.Response(ApprovalApplicationSerializer(data[0]).data, status=status.HTTP_201_CREATED)


class ApprovalCountMonthlyViewSet(viewsets.ReadOnlyModelViewSet):
  """
  予約件数を取得（月間）
  """
  queryset = ApprovalApplication.objects.all()
  serializer_class = ApprovalCountMonthlySerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @extend_schema(
      parameters=[
          OpenApiParameter(
              name='approval',
              location=OpenApiParameter.QUERY,
              type=OpenApiTypes.STR,
              description='Approval ID',
              required=True,
          ),
          OpenApiParameter(
              name='year',
              type=OpenApiTypes.INT,
              location=OpenApiParameter.QUERY,
              description='年',
              required=True,
          ),
          OpenApiParameter(
              name='month',
              type=OpenApiTypes.INT,
              location=OpenApiParameter.QUERY,
              description='月',
              required=True,
          ),
      ],
  )
  def list(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())
    serializer = self.get_serializer(queryset, many=True)
    return response.Response(serializer.data, status=status.HTTP_200_OK)

  def get_queryset(self):
    approval_id = self.request.query_params.get('approval', None)
    year = self.request.query_params.get('year', None)
    month = self.request.query_params.get('month', None)
    queryset = ApprovalApplication.objects.filter(approval=approval_id, reservation__start__year=year, reservation__start__month=month).values('reservation__start__year', 'reservation__start__month', 'reservation__start__day').annotate(count=Count('reservation__start__year')).order_by('reservation__start__year', 'reservation__start__month', 'reservation__start__day')
    return queryset

  def get_serializer_class(self):
    if self.action == 'list':
      return ApprovalCountMonthlySerializer
    return ApprovalCountMonthlySerializer

  def get_serializer_context(self):
    return {'request': self.request}

  def get_permissions(self):
    """
    listアクションのみ許可
    """
    if self.action == 'list':
      return [permissions.AllowAny()]
    return [permissions.IsAdminUser()]


class UnapprovalCountsViewSet(
        mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
  queryset = ApprovalApplication.objects.filter(approval=1).values('reservation__start').order_by('reservation__start').distinct()
  serializer_class = UnapprovalCountsSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filter_class = ApprovalApplicationFilter
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageViewSet(viewsets.ModelViewSet):
  queryset = Usage.objects.all()
  serializer_class = UsageSerializer
  filter_fields = [f.name for f in Usage._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeViewSet(viewsets.ModelViewSet):
  queryset = Age.objects.all()
  serializer_class = AgeSerializer
  filter_fields = [f.name for f in Age._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)@method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class TimeViewSet(viewsets.ModelViewSet):
  queryset = Time.objects.all()
  serializer_class = TimeSerializer
  filter_fields = [f.name for f in Time._meta.fields]
  # permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1HOUR))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1HOUR))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageCategoryViewSet(viewsets.ModelViewSet):
  queryset = UsageCategory.objects.all()
  serializer_class = UsageCategorySerializer
  filter_fields = [f.name for f in UsageCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: ['list', 'retrieve', 'update', 'partial_update', 'create', 'destroy'],
      permissions.AllowAny: []
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeCategoryViewSet(viewsets.ModelViewSet):
  queryset = AgeCategory.objects.all()
  serializer_class = AgeCategorySerializer
  filter_fields = [f.name for f in AgeCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: ['list', 'retrieve', 'update', 'partial_update', 'create', 'destroy'],
      permissions.AllowAny: []
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class DefferdPaymentViewSet(viewsets.ModelViewSet):
  queryset = DefferdPayment.objects.all()
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: ['list', 'retrieve', 'update', 'partial_update', 'create'],
      permissions.AllowAny: []
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class FacilityFeeViewSet(viewsets.ModelViewSet):
  queryset = FacilityFee.objects.all()
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1DAY))
  def list(self, request, *args, **kwargs):
    self.queryset = FacilityFee.objects.all().values('place__name').order_by('place__name').distinct()
    self.serializer_class = GetFacilityFeeSerializer
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentFeeViewSet(viewsets.ModelViewSet):
  queryset = EquipmentFee.objects.all()
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]
  filter_fields += ['equipment__place__' + f.name for f in Place._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    self.queryset = EquipmentFee.objects.all().values('equipment__place__name').order_by('equipment__place__name').distinct()
    self.serializer_class = GetEquipmentFeeSerializer
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


# ----Nested router----


class ApprovalApprovalApplicationViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    approval_pk = self.kwargs.get('approval_pk')
    queryset = ApprovalApplication.objects.all().prefetch_related('approval')
    return queryset.filter(approval=approval_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceReservationViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = Reservation.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceFacilityFeeViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = FacilityFee.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentReservationViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = Reservation.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentEquipmentFeeViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = EquipmentFee.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)

# 予約日の期日が過ぎていないデータを検索


class ReservationApprovalApplicationViewSet(viewsets.ReadOnlyModelViewSet):
  """
  予約日の期日が過ぎていないデータを検索する。
  """
  serializer_class = ApprovalApplicationSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filter_class = ApprovalFilter
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    date = self.kwargs.get('reservation_pk')
    now = str(datetime.datetime.now(pytz.timezone('Asia/Tokyo')).strftime('%Y-%m-%dT%H:%M'))
    queryset = ApprovalApplication.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation__start__range=[now, date])

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationUsageCategoryViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = UsageCategorySerializer
  filter_fields = [f.name for f in UsageCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = UsageCategory.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationAgeCategoryViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = AgeCategorySerializer
  filter_fields = [f.name for f in AgeCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = AgeCategory.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationDefferdPaymentViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = DefferdPayment.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageUsageCategoryViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = UsageCategorySerializer
  filter_fields = [f.name for f in UsageCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    usage_pk = self.kwargs.get('usage_pk')
    queryset = UsageCategory.objects.all().prefetch_related('usage')
    return queryset.filter(usage=usage_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeAgeCategoryViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = AgeCategorySerializer
  filter_fields = [f.name for f in AgeCategory._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    age_pk = self.kwargs.get('age_pk')
    queryset = AgeCategory.objects.all().prefetch_related('age')
    return queryset.filter(age=age_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ApprovalApplicationCsvExportViewSet(
        mixins.CreateModelMixin,
        viewsets.GenericViewSet):
  queryset = ApprovalApplication.objects
  serializer_class = ApprovalApplicationSerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['create'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: []
  }

  def create(self, request, *args, **kwargs):
    # request.dataにapprovalが送られていない場合
    if 'approval' not in request.data:
      return response.Response({'error': 'approval is required'}, status=status.HTTP_400_BAD_REQUEST)
    elif 'start1' not in request.data:
      return response.Response({'error': 'start1 is required'}, status=status.HTTP_400_BAD_REQUEST)
    elif 'start2' not in request.data:
      return response.Response({'error': 'start2 is required'}, status=status.HTTP_400_BAD_REQUEST)
    else:
      csv = csv_export(request)
      if csv:
        return response.Response({'path': csv}, status=status.HTTP_200_OK)
      else:
        return response.Response({'error': 'csv is not generated'}, status=status.HTTP_400_BAD_REQUEST)
    # serializer = self.serializer_class(data=csv_export(request), many=True)
    # if serializer:
    #   serializer.is_valid()
    #   return response.Response(serializer.data)
    # else:
    #   serializer.is_valid()
    #   return response.Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ReservationDeleteViewSet(
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet):
  """
  日時を指定し、指定された期間のデータを全て削除する。
  start1および、start2という名前のパラメータを送り、
  start1 ～ start2の期間のデータを削除。
  """
  queryset = Reservation.objects
  serializer_class = ReservationSerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: []
  }

  def destroy(self, request, *args, **kwargs):
    if 'start1' not in request.data:
      return response.Response({'error': 'start1 is required'}, status=status.HTTP_400_BAD_REQUEST)
    elif 'start2' not in request.data:
      return response.Response({'error': 'start2 is required'}, status=status.HTTP_400_BAD_REQUEST)
    else:
      queryset = Reservation.objects.filter(start__range=[request.data['start1'], request.data['start2']])

      if queryset.exists():
        queryset.delete()
        return response.Response({'detail': '正常に削除されました。'}, status=status.HTTP_200_OK)
      else:
        serializer = self.serializer_class(data=queryset)
        serializer.is_valid()
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
