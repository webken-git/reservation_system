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
  place = PlaceSerializer(many=True, read_only=True)
  place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), many=True, write_only=True)

  class Meta:
    model = Equipment
    fields = '__all__'

  def create(self, validated_data):
    validated_data['place'] = validated_data.get('place_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['place_id']

    place_data = validated_data.pop('place')
    equipment = Equipment.objects.create(**validated_data)
    equipment.save()
    equipment.place.set(place_data)

    return equipment

  def update(self, instance, validated_data):
    # 更新処理
    validated_data['place'] = validated_data.get('place_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['place_id']

    place_data = validated_data.pop('place')
    instance.save()
    instance.place.set(place_data)

    return instance


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
  reservation = ReservationSerializer(read_only=True)
  approval = ApprovalSerializer(read_only=True)
  approval_id = serializers.PrimaryKeyRelatedField(queryset=Approval.objects.all(), write_only=True)
  reservation_id = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all(), write_only=True)

  class Meta:
    model = ApprovalApplication
    fields = '__all__'
    extra_kwargs = {
        'usage_fee': {'required': False},
        'heating_fee': {'required': False},
        'electric_fee': {'required': False},
        'conditions': {'required': False}
    }

  def create(self, validated_data):
    validated_data['reservation'] = validated_data.get('reservation_id', None)
    validated_data['approval'] = validated_data.get('approval_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['reservation_id']
    del validated_data['approval_id']

    return ApprovalApplication.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.reservation = validated_data.get('reservation_id', instance.reservation)
    instance.approval = validated_data.get('approval_id', instance.approval)
    instance.usage_fee = validated_data.get('usage_fee', instance.usage_fee)
    instance.heating_fee = validated_data.get('heating_fee', instance.heating_fee)
    instance.electric_fee = validated_data.get('electric_fee', instance.electric_fee)
    instance.conditions = validated_data.get('conditions', instance.conditions)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['reservation_id']
    del validated_data['approval_id']
    instance.save()

    return instance


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

  def update(self, instance, validated_data):
    # 更新処理
    validated_data['usage'] = validated_data.get('usage_id', instance.usage)
    instance.reservation = validated_data.get('reservation', instance.reservation)

    # instance.reservation = validated_data.get('reservation_id', instance.reservation)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['usage_id']
    # del validated_data['reservation_id']

    usage_data = validated_data.pop('usage')
    instance.save()
    instance.usage.set(usage_data)

  #   del validated_data['usage_id']
  #   del validated_data['reservation_id']

  #   return UsageCategorize.objects.create(**validated_data)


class AgeCategorizeSerializer(serializers.ModelSerializer):
  usage = AgeSerializer(many=True)
  reservation = ReservationSerializer()

  class Meta:
    model = AgeCategorize
    fields = '__all__'

  def create(self, validated_data):
    validated_data['age'] = validated_data.get('age_id', None)
    # validated_data['reservation'] = validated_data.get('reservation_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['age_id']
    # del validated_data['reservation_id']

    age_data = validated_data.pop('age')
    age_categorize = AgeCategorize.objects.create(**validated_data)
    age_categorize.save()
    age_categorize.age.set(age_data)

    return age_categorize

  def update(self, instance, validated_data):
    # 更新処理
    validated_data['age'] = validated_data.get('age_id', instance.age)
    instance.reservation = validated_data.get('reservation', instance.reservation)

    # instance.reservation = validated_data.get('reservation_id', instance.reservation)
    # PrimaryKeyRelatedFieldを削除
    del validated_data['age_id']
    # del validated_data['reservation_id']

    age_data = validated_data.pop('age')
    instance.save()
    instance.age.set(age_data)

    return instance


class DefferdPaymentSerializer(serializers.ModelSerializer):
  reservation = ReservationSerializer()

  class Meta:
    model = DefferdPayment
    fields = '__all__'

  def create(self, validated_data):
    # validated_data['reservation'] = validated_data.get('reservation_id', None)

    # PrimaryKeyRelatedFieldを削除
    # del validated_data['reservation_id']

    return DefferdPayment.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.reservation = validated_data.get('reservation', instance.reservation)
    instance.reason = validated_data.get('reason', instance.reason)
    # PrimaryKeyRelatedFieldを削除
    # del validated_data['reservation_id']
    instance.save()

    return instance


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
