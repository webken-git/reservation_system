from django.shortcuts import render
from rest_framework import status, viewsets, filters
from rest_framework.decorators import action
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_405_METHOD_NOT_ALLOWED
)
from rest_framework.response import Response
import datetime
import pytz
from reservations.models import *
from reservations.serializers import *

# Create your views here.


class ApprovalViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Approval.objects.all()
  serializer_class = ApprovalSerializer
  filter_fields = [f.name for f in Approval._meta.fields]


class PlaceViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer
  filter_fields = [f.name for f in Place._meta.fields]


class EquipmentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Equipment.objects.all()
  serializer_class = EquipmentSerializer
  filter_fields = [f.name for f in Equipment._meta.fields]


class SpecialEquipmentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = SpecialEquipment.objects.all()
  serializer_class = SpecialEquipmentSerializer
  filter_fields = [f.name for f in SpecialEquipment._meta.fields]


class ReservationViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]


class UserInfoViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = UserInfo.objects.all()
  serializer_class = UserInfoSerializer
  filter_fields = [f.name for f in UserInfo._meta.fields]


class ApprovalApplicationViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = ApprovalApplication.objects.all()
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]


class UsageViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Usage.objects.all()
  serializer_class = UsageSerializer
  filter_fields = [f.name for f in Usage._meta.fields]


class AgeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Age.objects.all()
  serializer_class = AgeSerializer
  filter_fields = [f.name for f in Age._meta.fields]


class UsageCategorizeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = UsageCategorize.objects.all()
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]


class AgeCategorizeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = AgeCategorize.objects.all()
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]


class DefferdPaymentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = DefferdPayment.objects.all()
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]


class FacilityFeeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = FacilityFee.objects.all()
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]

  # @action(detail=True, methods=['post'])
  # def post(self, request, pk=None):
  #   queryset = calculate_wrap(request)
  #   serializer = FacilityFeeSerializer(queryset, many=True)
  #   return Response(serializer.data)


class EquipmentFeeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = EquipmentFee.objects.all()
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]

# ----Nested router----


class ApprovalApprovalApplicationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ApprovalApplicationSerializer
  filter_fields = [f.name for f in ApprovalApplication._meta.fields]

  def get_queryset(self):
    approval_pk = self.kwargs.get('approval_pk')
    queryset = ApprovalApplication.objects.all().prefetch_related('approval')
    return queryset.filter(approval=approval_pk)


class PlaceReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = Reservation.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)


class PlaceFacilityFeeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = FacilityFeeSerializer
  filter_fields = [f.name for f in FacilityFee._meta.fields]

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = FacilityFee.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)


class EquipmentReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = Reservation.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)


class EquipmentEquipmentFeeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = EquipmentFeeSerializer
  filter_fields = [f.name for f in EquipmentFee._meta.fields]

  def get_queryset(self):
    equipment_pk = self.kwargs.get('equipment_pk')
    queryset = EquipmentFee.objects.all().prefetch_related('equipment')
    return queryset.filter(equipment=equipment_pk)


class SpecialEquipmentReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    special_equipment_pk = self.kwargs.get('special_equipment_pk')
    queryset = Reservation.objects.all().prefetch_related('special_equipment')
    return queryset.filter(special_equipment=special_equipment_pk)


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


class ReservationUsageCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = UsageCategorize.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)


class ReservationAgeCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = AgeCategorize.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)


class ReservationDefferdPaymentViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    reservation_pk = self.kwargs.get('reservation_pk')
    queryset = DefferdPayment.objects.all().prefetch_related('reservation')
    return queryset.filter(reservation=reservation_pk)


class UsageUsageCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = UsageCategorizeSerializer
  filter_fields = [f.name for f in UsageCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    usage_pk = self.kwargs.get('usage_pk')
    queryset = UsageCategorize.objects.all().prefetch_related('usage')
    return queryset.filter(usage=usage_pk)


class AgeAgeCategorizeViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]
  filter_fields += ['reservation__' + f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    age_pk = self.kwargs.get('age_pk')
    queryset = AgeCategorize.objects.all().prefetch_related('age')
    return queryset.filter(age=age_pk)
