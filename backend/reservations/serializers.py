from rest_framework import fields
from rest_framework.serializers import ModelSerializer
from reservations.models import *
from users.serializers import UserSerializer


class ApprovalSerializer(ModelSerializer):
  class Meta:
    model = Approval
    fields = '__all__'


class PlaceSerializer(ModelSerializer):
  class Meta:
    model = Place
    fields = '__all__'


class EquipmentSerializer(ModelSerializer):
  class Meta:
    model = Equipment
    fields = '__all__'


class SpecialEquipmentSerializer(ModelSerializer):
  class Meta:
    model = SpecialEquipment
    fields = '__all__'


class ReservationSerializer(ModelSerializer):
  users = UserSerializer()
  places = PlaceSerializer()
  equipments = EquipmentSerializer()
  special_equipments = SpecialEquipmentSerializer()

  class Meta:
    model = Reservation
    fields = '__all__'


class UserInfoSerializer(ModelSerializer):
  users = UserSerializer()

  class Meta:
    model = UserInfo
    fields = '__all__'


class ApprovalApplicationSerializer(ModelSerializer):
  reservations = ReservationSerializer()
  approvals = ApprovalSerializer()

  class Meta:
    model = ApprovalApplication
    fields = '__all__'


class UsageSerializer(ModelSerializer):
  class Meta:
    model = Usage
    fields = '__all__'


class AgeSerializer(ModelSerializer):
  class Meta:
    model = Age
    fields = '__all__'


class UsageCategorizeSerializer(ModelSerializer):
  usages = UsageSerializer(many=True)
  reservations = ReservationSerializer()

  class Meta:
    model = UsageCategorize
    fields = '__all__'


class AgeCategorizeSerializer(ModelSerializer):
  usages = AgeSerializer(many=True)
  reservations = ReservationSerializer()

  class Meta:
    model = AgeCategorize
    fields = '__all__'


class DefferdPaymentSerializer(ModelSerializer):
  reservations = ReservationSerializer()

  class Meta:
    model = DefferdPayment
    fields = '__all__'
