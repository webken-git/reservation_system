from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets, response, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_405_METHOD_NOT_ALLOWED
)
from django_filters import rest_framework as filters
import datetime
import pytz
from reservations.models import *
from reservations.serializers import *
from reservations.filters import ReservationFilter
from reservations.views.csv import csv_export


# データの変更が頻繫にあるAPIのキャッシュの期限は5分
TIME_OUTS_5MINUTES = 60 * 5
# UserInfoなどのデータ変更はあまりないAPIのキャッシュの期限は1日
TIME_OUTS_1DAY = 60 * 60 * 24
# マスターデータのキャッシュの期限は30日
TIME_OUTS_1MONTH = TIME_OUTS_1DAY * 30

# Create your views here.


class ApprovalViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Approval.objects.all()
  serializer_class = ApprovalSerializer
  filter_fields = [f.name for f in Approval._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer
  filter_fields = [f.name for f in Place._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Equipment.objects.all()
  serializer_class = EquipmentSerializer
  filter_fields = [f.name for f in Equipment._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class SpecialEquipmentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = SpecialEquipment.objects.all()
  serializer_class = SpecialEquipmentSerializer
  filter_fields = [f.name for f in SpecialEquipment._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer
  # filter_fields = [f.name for f in Reservation._meta.fields]
  filter_backends = [filters.DjangoFilterBackend]
  filter_class = ReservationFilter

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  # @method_decorator(vary_on_cookie)
  # @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UserInfoViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = UserInfo.objects.all()
  serializer_class = UserInfoSerializer
  filter_fields = [f.name for f in UserInfo._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1DAY))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1DAY))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ApprovalApplicationViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = ApprovalApplication.objects.all()
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]
  filter_fields += ['approval__' + f.name for f in Approval._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Usage.objects.all()
  serializer_class = UsageSerializer
  filter_fields = [f.name for f in Usage._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Age.objects.all()
  serializer_class = AgeSerializer
  filter_fields = [f.name for f in Age._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageCategorizeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = UsageCategorize.objects.all()
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeCategorizeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = AgeCategorize.objects.all()
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class DefferdPaymentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = DefferdPayment.objects.all()
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class FacilityFeeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = FacilityFee.objects.all()
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentFeeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = EquipmentFee.objects.all()
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)
# ----Nested router----


class ApprovalApprovalApplicationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]

  def get_queryset(self):
    approval_pk = self.kwargs.get('approval_pk')
    queryset = ApprovalApplication.objects.all().prefetch_related('approval')
    return queryset.filter(approval=approval_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = Reservation.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class PlaceFacilityFeeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = FacilityFee.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = Reservation.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class EquipmentEquipmentFeeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = EquipmentFee.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_1MONTH))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class SpecialEquipmentReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    special_equipment_pk = self.kwargs.get('special_equipment_pk')
    queryset = Reservation.objects.all().prefetch_related('special_equipment')
    return queryset.filter(special_equipment=special_equipment_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)

# 予約日の期日が過ぎていないデータを検索


class ReservationApprovalApplicationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    """
    「現在～指定した日付」の範囲の予約データを検索する。
    現在の日付はdatetime.nowで取得する。
    そのため、物凄い先の未来の日付を指定して検索すると期日が過ぎていないデータを取得可能。
    ~/api/reservatios/9999-01-01T00:00（指定した日付）/approval-applications/
    の様に利用すると良いかと。
    """
    date = self.kwargs.get('reservation_pk')
    now = str(datetime.datetime.now(pytz.timezone('Asia/Tokyo')))
    queryset = ApprovalApplication.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation__start__range=[now, date])

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationUsageCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = UsageCategorize.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationAgeCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = AgeCategorize.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ReservationDefferdPaymentViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = DefferdPayment.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class UsageUsageCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    usage_pk = self.kwargs.get('usage_pk')
    queryset = UsageCategorize.objects.all().prefetch_related('usage')
    return queryset.filter(usage=usage_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AgeAgeCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    age_pk = self.kwargs.get('age_pk')
    queryset = AgeCategorize.objects.all().prefetch_related('age')
    return queryset.filter(age=age_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class ApprovalApplicationCsvExportView(views.APIView):
  # permission_classes = [IsAuthenticated]
  serializer_class = ApprovalApplicationSerializer

  def post(self, request):
    csv = csv_export(request)
    if csv:
      return response.Response({'path': csv}, status=HTTP_200_OK)
    else:
      return response.Response({'detail': '失敗しました。'}, status=HTTP_400_BAD_REQUEST)
    # serializer = self.serializer_class(data=csv_export(request), many=True)
    # if serializer:
    #   serializer.is_valid()
    #   return response.Response(serializer.data)
    # else:
    #   serializer.is_valid()
    #   return response.Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ReservationDeleteView(views.APIView):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer

  def delete(self, request):
    queryset = Reservation.objects.filter(start__range=[request.data['start1'], request.data['start2']])

    if queryset.exists():
      queryset.delete()
      return response.Response({'detail': '正常に削除されました。'}, status=HTTP_200_OK)
    else:
      serializer = self.serializer_class(data=queryset)
      serializer.is_valid()
      return response.Response(serializer.errors, status=HTTP_400_BAD_REQUEST)