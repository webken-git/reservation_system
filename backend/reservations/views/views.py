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
from reservations.models import *
from reservations.serializers import *
from reservations.views.usage_fee import calculate_wrap
# Create your views here.


class ReservationViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]


class PlaceViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer
  filter_fields = [f.name for f in Place._meta.fields]

  # @action(methods=['post'], detail=True)
  # def post(self, request, pk=None):
  #   serializer = PlaceSerializer(data=request.data)
  #   if not serializer.is_valid():
  #     return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
  #   serializer.save()
  #   return Response(serializer.data, status=HTTP_201_CREATED)


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


class AgeCategorizeViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = AgeCategorize.objects.all()
  serializer_class = AgeCategorizeSerializer
  filter_fields = [f.name for f in AgeCategorize._meta.fields]


class DefferdPaymentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = DefferdPayment.objects.all()
  serializer_class = DefferdPaymentSerializer
  filter_fields = [f.name for f in DefferdPayment._meta.fields]


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


class PlaceReservationViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = ReservationSerializer
  filter_fields = [f.name for f in Reservation._meta.fields]

  def get_queryset(self):
    place_pk = self.kwargs.get('place_pk')
    queryset = Reservation.objects.all().prefetch_related('place')
    return queryset.filter(place=place_pk)
