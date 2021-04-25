from django.db import models
from django.core import validators
from phonenumber_field.modelfields import PhoneNumberField
from users.models import User

# Create your models here.

# 予約状態マスタ（承認、未承認など）


class Approval(models.Model):
  name = models.CharField('状態', max_length=25)

  def __str__(self):
    return self.name

# 施設名マスタ


class Place(models.Model):
  name = models.CharField('利用体育施設の名称', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

# 附属設備・器具マスタ


class Equipment(models.Model):
  name = models.CharField('附属設備・器具', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

# 特別設備マスタ


class SpecialEquipment(models.Model):
  name = models.CharField('特別設備', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

# 予約テーブル


class Reservation(models.Model):
  users = models.ForeignKey(
      User, verbose_name='users',
      blank=True, null=True,
      related_name='reservations_users',
      on_delete=models.SET_NULL
  )
  group_name = models.CharField('団体名', max_length=25, blank=True, null=True)
  reader_name = models.CharField('代表者名', max_length=25, blank=True, null=True)
  contact_name = models.CharField('連絡者名', max_length=25)
  address = models.CharField('住所', max_length=125)
  tel = PhoneNumberField('電話番号', unique=True)
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
  places = models.ForeignKey(
      Place, verbose_name='places',
      blank=True, null=True,
      related_name='reservations_places', on_delete=models.SET_NULL
  )
  equipments = models.ForeignKey(
      Equipment, verbose_name='equipments',
      blank=True, null=True,
      related_name='reservations_equipments', on_delete=models.SET_NULL
  )
  special_equipments = models.ForeignKey(
      SpecialEquipment, verbose_name='special_equipments',
      blank=True, null=True,
      related_name='resercvations_special_equipments', on_delete=models.SET_NULL
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.group_name + ' ' + self.reader_name + ' ' + self.contact_name + ' ' + self.address

# 保存した予約情報テーブル


class UserInfo(models.Model):
  users = models.ForeignKey(
      User, verbose_name='users',
      blank=True, null=True,
      related_name='user_info_users',
      on_delete=models.SET_NULL
  )
  group_name = models.CharField('団体名', max_length=25, blank=True, null=True)
  reader_name = models.CharField('代表者名', max_length=25, blank=True, null=True)
  contact_name = models.CharField('連絡者名', max_length=25)
  address = models.CharField('住所', max_length=125)
  tel = PhoneNumberField('電話番号', unique=True)
  is_group = models.BooleanField('is_group', default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

# 承認申請テーブル


class ApprovalApplication(models.Model):
  reservations = models.ForeignKey(
      Reservation, verbose_name='reservations',
      related_name='approval_apps_reservations',
      on_delete=models.CASCADE
  )
  usage_fee = models.IntegerField('利用料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)])
  heating_fee = models.IntegerField('暖房料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)])
  electric_fee = models.IntegerField('電気料', validators=[
      validators.MinValueValidator(0),
      validators.MaxValueValidator(20000)])
  conditions = models.TextField('承認の条件', max_length=255)
  approvals = models.ForeignKey(
      Approval, verbose_name='approvals',
      related_name='approval_apps_approvals',
      on_delete=models.PROTECT
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

# 利用区分マスタ


class Usage(models.Model):
  name = models.CharField('利用区分', max_length=25)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

# 年齢区分マスタ


class Age(models.Model):
  name = models.CharField('年齢区分', max_length=10)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

# 利用区分テーブル


class UsageCategorize(models.Model):
  usages = models.ManyToManyField(
      Usage,
      verbose_name='usages',
      related_name='usage_categorizes_usages',
  )
  reservations = models.ForeignKey(
      Reservation, verbose_name='reservations',
      related_name='usage_categorizes_reservations',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


# 年齢区分テーブル


class AgeCategorize(models.Model):
  ages = models.ManyToManyField(
      Usage,
      verbose_name='ages',
      related_name='age_categorizes_usages',
  )
  reservations = models.ForeignKey(
      Reservation, verbose_name='reservations',
      related_name='age_categorizes_reservations',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

# 後納テーブル


class DefferdPayment(models.Model):
  reason = models.CharField('後納の理由', max_length=50)
  reservations = models.ForeignKey(
      Reservation, verbose_name='reservations',
      related_name='defferd_payments_reservations',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.reason
