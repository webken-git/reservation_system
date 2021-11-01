# Generated by Django 3.2.8 on 2021-10-26 14:06

import django.core.validators
from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

  initial = True

  dependencies = [
  ]

  operations = [
      migrations.CreateModel(
          name='Age',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(max_length=10, verbose_name='年齢区分')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='AgeCategory',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Approval',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(max_length=25, verbose_name='状態')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='ApprovalApplication',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('usage_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='利用料')),
              ('heating_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='暖房料')),
              ('electric_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='電気料')),
              ('conditions', models.TextField(blank=True, max_length=255, null=True, verbose_name='承認の条件')),
              ('cancellation_reason', models.TextField(blank=True, max_length=255, null=True, verbose_name='取り消しの理由')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='DefferdPayment',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('reason', models.CharField(max_length=50, verbose_name='後納の理由')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Equipment',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(blank=True, max_length=25, null=True, verbose_name='附属設備・器具')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='EquipmentFee',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('fee', models.IntegerField(verbose_name='料金')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='FacilityFee',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('is_group', models.BooleanField(default=False, verbose_name='is_group')),
              ('purpose', models.CharField(blank=True, max_length=15, null=True, verbose_name='使用目的')),
              ('fee', models.IntegerField(verbose_name='料金')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Place',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(max_length=25, verbose_name='利用体育施設の名称')),
              ('max', models.IntegerField(blank=True, default=1, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)], verbose_name='最大シート数')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Reservation',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('group_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='団体名')),
              ('reader_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='代表者名')),
              ('contact_name', models.CharField(max_length=25, verbose_name='連絡者名')),
              ('address', models.CharField(max_length=125, verbose_name='住所')),
              ('tel', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, verbose_name='電話番号')),
              ('is_group', models.BooleanField(default=False, verbose_name='is_group')),
              ('delete_flag', models.BooleanField(default=False, verbose_name='delete_flag')),
              ('start', models.DateTimeField(verbose_name='利用開始日時')),
              ('end', models.DateTimeField(verbose_name='利用終了日時')),
              ('organizer_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='主催関係者数')),
              ('participant_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='参集人員数')),
              ('purpose', models.TextField(max_length=75, verbose_name='利用目的')),
              ('admission_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='入場料の徴収')),
              ('place_number', models.IntegerField(blank=True, default=1, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)], verbose_name='シート数')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='ReservationSuspensionSchedule',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('start', models.DateTimeField(verbose_name='開始日時')),
              ('end', models.DateTimeField(verbose_name='終了日時')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='SpecialEquipment',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(blank=True, max_length=25, null=True, verbose_name='特別設備')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Time',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(max_length=25, verbose_name='時間区分')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='Usage',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('name', models.CharField(max_length=25, verbose_name='利用区分')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='UsageCategory',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
      migrations.CreateModel(
          name='UserInfo',
          fields=[
              ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
              ('group_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='団体名')),
              ('reader_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='代表者名')),
              ('contact_name', models.CharField(max_length=25, verbose_name='連絡者名')),
              ('address', models.CharField(max_length=125, verbose_name='住所')),
              ('tel', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, verbose_name='電話番号')),
              ('is_group', models.BooleanField(default=False, verbose_name='is_group')),
              ('created_at', models.DateTimeField(auto_now_add=True)),
              ('updated_at', models.DateTimeField(auto_now=True)),
          ],
      ),
  ]
