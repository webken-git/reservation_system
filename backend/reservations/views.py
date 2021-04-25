from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_405_METHOD_NOT_ALLOWED
)
from rest_framework.response import Response
from reservations.models import *
from reservations.serializers import *
# Create your views here.


class ReservationCreateView(CreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer


class ReservationDetailsView(RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer


class PlaceCreateView(ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer


class PlaceDetailsView(RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Place.objects.all()
  serializer_class = PlaceSerializer
