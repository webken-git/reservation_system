from django.db import models
from django.core import validators
from django.db.models.fields.related import ForeignKey
from users.models import User
import uuid

# Create your models here.


class ReservationSuspensionSchedule(models.Model):
  """
  予約停止スケジュールテーブル
  """
  start = models.DateTimeField('開始日時')
  end = models.DateTimeField('終了日時')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Approval(models.Model):
  """
  予約承認テーブル
  """
  name = models.CharField('状態', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Place(models.Model):
  """
  予約場所テーブル
  """
  name = models.CharField('利用体育施設の名称', max_length=25)
  min = models.FloatField('最小利用時間', default=1.0)
  max = models.FloatField('最大利用時間', default=1.0, validators=[validators.MinValueValidator(1.0), validators.MaxValueValidator(25.0)])
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Equipment(models.Model):
  """
  附属設備・器具テーブル
  """
  name = models.CharField('附属設備・器具', max_length=25, blank=True, null=True)
  place = models.ManyToManyField(
      Place,
      verbose_name='place',
      related_name='equipment_place'
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class SpecialEquipment(models.Model):
  """
  特別設備テーブル
  """
  name = models.CharField('特別設備', max_length=25, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Reservation(models.Model):
  """
  予約テーブル
  """
  # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ForeignKey(
      User, verbose_name='user',
      blank=True, null=True,
      related_name='reservation_user',
      on_delete=models.CASCADE
  )
  group_name = models.CharField('団体名', max_length=25, blank=True, null=True)
  reader_name = models.CharField('代表者名', max_length=25, blank=True, null=True)
  contact_name = models.CharField('連絡者名', max_length=25)
  address = models.CharField('住所', max_length=125)
  tel = models.CharField('電話番号', max_length=15, blank=True, null=True)
  is_group = models.BooleanField('is_group', default=False)
  delete_flag = models.BooleanField('delete_flag', default=False)
  start = models.DateTimeField('利用開始日時')
  end = models.DateTimeField('利用終了日時')
  organizer_number = models.IntegerField('主催関係者数', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)])
  participant_number = models.IntegerField('参集人員数', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)])
  purpose = models.TextField('利用目的', max_length=75)
  admission_fee = models.IntegerField('入場料の徴収', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)], blank=True, null=True)
  place = models.ForeignKey(
      Place, verbose_name='place',
      blank=True, null=True,
      related_name='reservation_place', on_delete=models.SET_NULL
  )
  place_number = models.IntegerField(
      'シート数', blank=True, null=True, default=1, validators=[validators.MinValueValidator(1), validators.MaxValueValidator(10)])
  equipment = models.ManyToManyField(
      Equipment, verbose_name='equipment',
      blank=True,
      related_name='reservation_equipment'
  )
  special_equipment = models.ManyToManyField(
      SpecialEquipment, verbose_name='special_equipment',
      blank=True,
      related_name='resercvation_special_equipment'
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.reader_name + ' ' + self.contact_name + ' ' + self.address


class UserInfo(models.Model):
  """
  ユーザー情報テーブル
  """
  # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ForeignKey(
      User, verbose_name='user',
      blank=True, null=True,
      related_name='user_info_user',
      on_delete=models.CASCADE
  )
  group_name = models.CharField('団体名', max_length=25, blank=True, null=True)
  reader_name = models.CharField('代表者名', max_length=25, blank=True, null=True)
  contact_name = models.CharField('連絡者名', max_length=25)
  address = models.CharField('住所', max_length=125)
  tel = models.CharField('電話番号', max_length=15, blank=True, null=True)
  is_group = models.BooleanField('is_group', default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class ApprovalApplication(models.Model):
  """
  予約承認申請テーブル
  """
  # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  reservation = models.ForeignKey(
      Reservation, verbose_name='reservation',
      related_name='approval_app_reservation',
      on_delete=models.CASCADE
  )
  usage_fee = models.IntegerField('利用料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)],
      blank=True, null=True)
  heating_fee = models.IntegerField('暖房料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)],
      blank=True, null=True)
  electric_fee = models.IntegerField('電気料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)],
      blank=True, null=True)
  conditions = models.TextField('承認の条件', max_length=255, blank=True, null=True)
  cancellation_reason = models.TextField('キャンセルの理由', max_length=255, blank=True, null=True)
  approval = models.ForeignKey(
      Approval, verbose_name='approval',
      related_name='approval_app_approval',
      on_delete=models.PROTECT
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Usage(models.Model):
  """
  利用テーブル
  """
  name = models.CharField('利用区分', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Age(models.Model):
  """
  年齢テーブル
  """
  name = models.CharField('年齢区分', max_length=10)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Time(models.Model):
  """
  時間テーブル
  """
  name = models.CharField('時間区分', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class UsageCategory(models.Model):
  """
  利用区分テーブル
  """
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  usage = models.ManyToManyField(
      Usage,
      verbose_name='usage',
      related_name='usage_category_usage',
  )
  reservation = models.ForeignKey(
      Reservation, verbose_name='reservation',
      related_name='usage_category_reservation',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class AgeCategory(models.Model):
  """
  年齢区分テーブル
  """
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  age = models.ManyToManyField(
      Age,
      verbose_name='age',
      related_name='age_category_age',
  )
  reservation = models.ForeignKey(
      Reservation, verbose_name='reservation',
      related_name='age_category_reservation',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class DefferdPayment(models.Model):
  """
  後納テーブル
  """
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  reason = models.CharField('後納の理由', max_length=50)
  reservation = models.ForeignKey(
      Reservation, verbose_name='reservation',
      related_name='defferd_payment_reservation',
      on_delete=models.CASCADE
  )
  fee = models.IntegerField('後納料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)],
      blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.reason


class FacilityFee(models.Model):
  """
  施設料金テーブル
  """
  place = ForeignKey(
      Place, verbose_name='place',
      related_name='facility_fee_place',
      on_delete=models.CASCADE
  )
  age = ForeignKey(
      Age, verbose_name='age',
      related_name='facility_fee_age',
      on_delete=models.CASCADE
  )
  time = ForeignKey(
      Time, verbose_name='time',
      related_name='facility_fee_time',
      on_delete=models.CASCADE
  )
  is_group = models.BooleanField('is_group', default=False)
  purpose = models.CharField('使用目的', max_length=15, blank=True, null=True)
  fee = models.IntegerField('料金')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class EquipmentFee(models.Model):
  """
  設備料金テーブル
  """
  equipment = ForeignKey(
      Equipment, verbose_name='equipment',
      related_name='equipment_fee_equipment',
      on_delete=models.CASCADE
  )
  fee = models.IntegerField('料金')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
