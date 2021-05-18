from django.db.models import query
from rest_framework import fields
from rest_framework import serializers
from reservations.models import *
from users.serializers import UserSerializer


class ApprovalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Approval
    fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Place
    fields = '__all__'


class EquipmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Equipment
    fields = '__all__'


class SpecialEquipmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = SpecialEquipment
    fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
  place = PlaceSerializer(read_only=True)
  place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), write_only=True)
  equipment = EquipmentSerializer(read_only=True)
  equipment_id = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all(), write_only=True)
  special_equipment = SpecialEquipmentSerializer(read_only=True)
  special_equipment_id = serializers.PrimaryKeyRelatedField(queryset=SpecialEquipment.objects.all(), write_only=True)

  class Meta:
    model = Reservation
    fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
  user = UserSerializer()

  class Meta:
    model = UserInfo
    fields = '__all__'


class ApprovalApplicationSerializer(serializers.ModelSerializer):
  reservation = ReservationSerializer()
  approval = ApprovalSerializer()

  class Meta:
    model = ApprovalApplication
    fields = '__all__'


class UsageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Usage
    fields = '__all__'


class AgeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Age
    fields = '__all__'


class UsageCategorizeSerializer(serializers.ModelSerializer):
  # usage = UsageSerializer(many=True)
  usage = serializers.PrimaryKeyRelatedField(queryset=Usage.objects.all(), many=True)
  # usage_id = serializers.PrimaryKeyRelatedField(queryset=Usage.objects.all(), write_only=True, many=True)
  reservation = ReservationSerializer(read_only=True)
  reservation_id = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all(), write_only=True)

  class Meta:
    model = UsageCategorize
    fields = '__all__'

  def create(self, validated_data):
    usage_data = validated_data.pop('usage')
    # validated_data['usage'] = validated_data.get('usage_id', None)
    validated_data['reservation'] = validated_data.get('reservation_id', None)

    del validated_data['reservation_id']
    # del validated_data['usage_id']
    usage_categorize = UsageCategorize.objects.create(**validated_data)
    usage_categorize.save()

    for data in usage_data:
      usages = Usage.objects.filter(id=data['id']).first()
      if usages is None:
        pass
      usage_categorize.usage.add(data)
    return usage_categorize

  #   validated_data['usage'] = validated_data.get('usage_id', None)
  #   validated_data['reservation'] = validated_data.get('reservation_id', None)

  #   del validated_data['usage_id']
  #   del validated_data['reservation_id']

  #   return UsageCategorize.objects.create(**validated_data)


class AgeCategorizeSerializer(serializers.ModelSerializer):
  usage = AgeSerializer(many=True)
  reservation = ReservationSerializer()

  class Meta:
    model = AgeCategorize
    fields = '__all__'


class DefferdPaymentSerializer(serializers.ModelSerializer):
  reservation = ReservationSerializer()

  class Meta:
    model = DefferdPayment
    fields = '__all__'


class FacilityFeeSerializer(serializers.ModelSerializer):
  place = PlaceSerializer(read_only=True)
  place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), write_only=True)
  age = AgeSerializer(read_only=True)
  age_id = serializers.PrimaryKeyRelatedField(queryset=Age.objects.all(), write_only=True)

  class Meta:
    model = FacilityFee
    fields = '__all__'

  def create(self, validated_data):
    validated_data['place'] = validated_data.get('place_id', None)
    validated_data['age'] = validated_data.get('age_id', None)

    del validated_data['place_id']
    del validated_data['age_id']

    return FacilityFee.objects.create(**validated_data)


class EquipmentFeeSerializer(serializers.ModelSerializer):
  equipment = EquipmentSerializer()

  class Meta:
    model = EquipmentFee
    fields = '__all__'
