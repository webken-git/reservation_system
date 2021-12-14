from django.db.models import query
from rest_framework import serializers
from rest_framework.relations import ManyRelatedField
from reservations.models import *
from users.serializers import UserSerializer
import datetime
from django.db.models.aggregates import Count


class ReservationSuspensionScheduleSerializer(serializers.ModelSerializer):
  class Meta:
    model = ReservationSuspensionSchedule
    fields = '__all__'


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
  equipment = EquipmentSerializer(many=True, read_only=True)
  equipment_id = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all(), many=True, write_only=True)
  special_equipment = SpecialEquipmentSerializer(many=True, read_only=True)
  special_equipment_id = serializers.PrimaryKeyRelatedField(queryset=SpecialEquipment.objects.all(), many=True, write_only=True)

  class Meta:
    model = Reservation
    fields = '__all__'

  def create(self, validated_data):
    validated_data['user'] = validated_data.get('user_id', None)
    validated_data['place'] = validated_data.get('place_id', None)
    validated_data['equipment'] = validated_data.get('equipment_id', None)
    validated_data['special_equipment'] = validated_data.get('special_equipment_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['place_id']
    del validated_data['equipment_id']
    del validated_data['special_equipment_id']

    equipment_data = validated_data.pop('equipment')
    special_equipment_data = validated_data.pop('special_equipment')
    reservation = Reservation.objects.create(**validated_data)
    reservation.save()
    reservation.equipment.set(equipment_data)
    reservation.special_equipment.set(special_equipment_data)

    return reservation

  def update(self, instance, validated_data):
    # 更新処理
    instance.user = validated_data.get('user_id', instance.user)
    instance.place = validated_data.get('place_id', instance.place)
    validated_data['equipment'] = validated_data.get('equipment_id', instance.equipment)
    validated_data['special_equipment'] = validated_data.get('special_equipment_id', instance.special_equipment)
    instance.group_name = validated_data.get('group_name', instance.group_name)
    instance.reader_name = validated_data.get('reader_name', instance.reader_name)
    instance.contact_name = validated_data.get('contact_name', instance.contact_name)
    instance.address = validated_data.get('address', instance.address)
    instance.tel = validated_data.get('tel', instance.tel)
    instance.is_group = validated_data.get('is_group', instance.is_group)
    instance.delete_flag = validated_data.get('delete_flag', instance.delete_flag)
    instance.start = validated_data.get('start', instance.start)
    instance.end = validated_data.get('end', instance.end)
    instance.organizer_number = validated_data.get('organizer_number', instance.organizer_number)
    instance.participant_number = validated_data.get('participant_number', instance.participant_number)
    instance.purpose = validated_data.get('purpose', instance.purpose)
    instance.admission_fee = validated_data.get('admission_fee', instance.admission_fee)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['place_id']
    del validated_data['equipment_id']
    del validated_data['special_equipment_id']
    instance.save()

    # 更新処理

    equipment_data = validated_data.pop('equipment')
    special_equipment_data = validated_data.pop('special_equipment')
    instance.save()
    instance.equipment.set(equipment_data)
    instance.special_equipment.set(special_equipment_data)

    return instance


class ReservationParameterSerializer(serializers.Serializer):
  # reservation = ReservationSerializer(read_only=True)
  # approval = ApprovalSerializer(read_only=True)
  # approval_id = serializers.PrimaryKeyRelatedField(queryset=Approval.objects.all(), write_only=True)
  # reservation_id = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all(), write_only=True)
  start1 = serializers.DateTimeField(help_text='開始(yyyy-mm-ddTH:M:S.fz)', required=True)
  start2 = serializers.DateTimeField(help_text='終了(yyyy-mm-ddTH:M:S.fz)', required=True)

  class Meta:
    model = Reservation
    fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

  class Meta:
    model = UserInfo
    fields = '__all__'

  def create(self, validated_data):
    validated_data['user'] = validated_data.get('user_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']

    return UserInfo.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.user = validated_data.get('user_id', instance.user)
    instance.group_name = validated_data.get('group_name', instance.group_name)
    instance.reader_name = validated_data.get('reader_name', instance.reader_name)
    instance.contact_name = validated_data.get('contact_name', instance.contact_name)
    instance.address = validated_data.get('address', instance.address)
    instance.tel = validated_data.get('tel', instance.tel)
    instance.is_group = validated_data.get('is_group', instance.is_group)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    instance.save()

    return instance


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


class ApprovalCountMonthlySerializer(serializers.ModelSerializer):
  """
  年月でグループ化して、各年月ごとの予約数を集計するViewのSerializer
  """
  class Meta:
    model = ApprovalApplication
    fields = ['year', 'month', 'count']
    # fields = ['count']

  year = serializers.SerializerMethodField('get_year')
  month = serializers.SerializerMethodField('get_month')
  count = serializers.SerializerMethodField('get_count')

  def get_year(self, obj):
    return obj['reservation__start__year']

  def get_month(self, obj):
    return obj['reservation__start__month']

  def get_count(self, obj):
    approval = self.context['request'].query_params.get('approval')
    return ApprovalApplication.objects.filter(approval=approval, reservation__start__year=obj['reservation__start__year'], reservation__start__month=obj['reservation__start__month']).count()


class UnapprovalCountsSerializer(serializers.ModelSerializer):
  class Meta:
    model = ApprovalApplication
    fields = ['count', 'start', 'data']

  count = serializers.SerializerMethodField('get_count')
  start = serializers.SerializerMethodField('get_start')
  data = serializers.SerializerMethodField('get_data')

  def get_count(self, obj):
    return ApprovalApplication.objects.filter(approval=1, reservation__start=obj['reservation__start']).count()

  def get_start(self, obj):
    query = ApprovalApplication.objects.filter(approval=1, reservation__start=obj['reservation__start'])
    serializer = ApprovalApplicationSerializer(query, many=True)
    return serializer.data[0]['reservation']['start']

  def get_data(self, obj):
    query = ApprovalApplication.objects.filter(approval=1, reservation__start=obj['reservation__start'])
    serializer = ApprovalApplicationSerializer(query, many=True)
    return serializer.data


class UsageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Usage
    fields = '__all__'


class AgeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Age
    fields = '__all__'


class TimeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Time
    fields = '__all__'


class UsageCategorySerializer(serializers.ModelSerializer):
  usage = UsageSerializer(many=True, read_only=True)
  usage_id = serializers.PrimaryKeyRelatedField(queryset=Usage.objects.all(), many=True, write_only=True)
  # reservation = ReservationSerializer(read_only=True)
  reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all())

  class Meta:
    model = UsageCategory
    fields = '__all__'
    # depth = 1

  def create(self, validated_data):
    validated_data['usage'] = validated_data.get('usage_id', None)
    # validated_data['reservation'] = validated_data.get('reservation_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['usage_id']
    # del validated_data['reservation_id']

    # usageの部分をpopして退避
    usage_data = validated_data.pop('usage')
    usage_category = UsageCategory.objects.create(**validated_data)
    usage_category.save()
    # for data in usage_data:
    #   usages = Usage.objects.filter(id=data['id']).first()
    #   if usages is None:
    #     data = Usage.objects.create(**usage_data)
    usage_category.usage.set(usage_data)

    return usage_category

  def update(self, instance, validated_data):
    # 更新処理
    validated_data['usage'] = validated_data.get('usage_id', instance.usage)
    instance.reservation = validated_data.get('reservation', instance.reservation)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['usage_id']
    # del validated_data['reservation_id']

    usage_data = validated_data.pop('usage')
    instance.save()
    instance.usage.set(usage_data)

    # 一旦、タグを全削除
    # instance.usage.clear()
    # # 追加時と同様に、退避したcategories_dataからcategoriesを追加
    # for data in usage_data:
    #   category = Category.objects.filter(id=category_data['id']).first()
    #   if category is None:
    #     category = Category.objects.create(**category_data)
    #     instance.categories.add(category)

    return instance


class AgeCategorySerializer(serializers.ModelSerializer):
  age = AgeSerializer(many=True, read_only=True)
  age_id = serializers.PrimaryKeyRelatedField(queryset=Age.objects.all(), many=True, write_only=True)
  # reservation = ReservationSerializer(read_only=True)
  reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all())

  class Meta:
    model = AgeCategory
    fields = '__all__'

  def create(self, validated_data):
    validated_data['age'] = validated_data.get('age_id', None)
    # validated_data['reservation'] = validated_data.get('reservation_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['age_id']
    # del validated_data['reservation_id']

    age_data = validated_data.pop('age')
    age_category = AgeCategory.objects.create(**validated_data)
    age_category.save()
    age_category.age.set(age_data)

    return age_category

  def update(self, instance, validated_data):
    # 更新処理
    validated_data['age'] = validated_data.get('age_id', instance.age)
    instance.reservation = validated_data.get('reservation', instance.reservation)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['age_id']
    # del validated_data['reservation_id']

    age_data = validated_data.pop('age')
    instance.save()
    instance.age.set(age_data)

    return instance


class DefferdPaymentSerializer(serializers.ModelSerializer):
  # reservation = ReservationSerializer(read_only=True)
  reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all())

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
  time = TimeSerializer(read_only=True)
  time_id = serializers.PrimaryKeyRelatedField(queryset=Time.objects.all(), write_only=True)

  class Meta:
    model = FacilityFee
    fields = '__all__'

  def create(self, validated_data):
    validated_data['place'] = validated_data.get('place_id', None)
    validated_data['age'] = validated_data.get('age_id', None)
    validated_data['time'] = validated_data.get('time_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['place_id']
    del validated_data['age_id']
    del validated_data['time_id']

    return FacilityFee.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.place = validated_data.get('place_id', instance.place)
    instance.age = validated_data.get('age_id', instance.age)
    instance.time = validated_data.get('time_id', instance.age)
    instance.is_group = validated_data.get('is_group', instance.is_group)
    instance.purpose = validated_data.get('purpose', instance.purpose)
    instance.fee = validated_data.get('fee', instance.fee)
    # PrimaryKeyRelatedFieldを削除
    del validated_data['place_id']
    del validated_data['age_id']
    del validated_data['time_id']
    instance.save()

    return instance


class GetFacilityFeeSerializer(serializers.ModelSerializer):

  class Meta:
    model = FacilityFee
    fields = ['place', 'data']

  place = serializers.SerializerMethodField('get_place')
  data = serializers.SerializerMethodField('get_data')

  def get_place(self, obj):
    query = FacilityFee.objects.filter(place__name=obj['place__name'])
    serializer = FacilityFeeSerializer(query, many=True)
    return serializer.data[0]['place']['name']

  def get_data(self, obj):
    query = FacilityFee.objects.filter(place__name=obj['place__name'])
    serializer = FacilityFeeSerializer(query, many=True)
    return serializer.data


class EquipmentFeeSerializer(serializers.ModelSerializer):
  equipment = EquipmentSerializer(read_only=True)
  equipment_id = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all(), write_only=True)

  class Meta:
    model = EquipmentFee
    fields = '__all__'

  def create(self, validated_data):
    validated_data['equipment'] = validated_data.get('equipment_id', None)
    # PrimaryKeyRelatedFieldを削除
    del validated_data['equipment_id']
    return EquipmentFee.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.equipment = validated_data.get('equipment_id', instance.equipment)
    instance.fee = validated_data.get('fee', instance.fee)
    # PrimaryKeyRelatedFieldを削除
    del validated_data['equipment_id']
    instance.save()

    return instance
