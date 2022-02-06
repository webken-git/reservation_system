# Generated by Django 4.0 on 2022-02-06 16:34

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
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
            name='Approval',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='状態')),
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
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='利用体育施設の名称')),
                ('min', models.FloatField(default=1.0, verbose_name='最小利用時間')),
                ('max', models.FloatField(default=1.0, validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(25.0)], verbose_name='最大利用時間')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('group_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='団体名')),
                ('reader_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='代表者名')),
                ('contact_name', models.CharField(max_length=25, verbose_name='連絡者名')),
                ('address', models.CharField(max_length=125, verbose_name='住所')),
                ('tel', models.CharField(blank=True, max_length=15, null=True, verbose_name='電話番号')),
                ('is_group', models.BooleanField(default=False, verbose_name='is_group')),
                ('delete_flag', models.BooleanField(default=False, verbose_name='delete_flag')),
                ('start', models.DateTimeField(verbose_name='利用開始日時')),
                ('end', models.DateTimeField(verbose_name='利用終了日時')),
                ('organizer_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='主催関係者数')),
                ('participant_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='参集人員数')),
                ('purpose', models.TextField(max_length=75, verbose_name='利用目的')),
                ('admission_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='入場料の徴収')),
                ('place_number', models.IntegerField(blank=True, default=1, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)], verbose_name='シート数')),
                ('special_equipment', models.CharField(blank=True, max_length=50, null=True, verbose_name='特別設備')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('equipment', models.ManyToManyField(blank=True, related_name='reservation_equipment', to='reservations.Equipment', verbose_name='equipment')),
                ('place', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reservation_place', to='reservations.place', verbose_name='place')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reservation_user', to='users.user', verbose_name='user')),
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
            name='UserInfo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('group_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='団体名')),
                ('reader_name', models.CharField(blank=True, max_length=25, null=True, verbose_name='代表者名')),
                ('contact_name', models.CharField(max_length=25, verbose_name='連絡者名')),
                ('address', models.CharField(max_length=125, verbose_name='住所')),
                ('tel', models.CharField(blank=True, max_length=15, null=True, verbose_name='電話番号')),
                ('is_group', models.BooleanField(default=False, verbose_name='is_group')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_info_user', to='users.user', verbose_name='user')),
            ],
        ),
        migrations.CreateModel(
            name='UsageCategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usage_category_reservation', to='reservations.reservation', verbose_name='reservation')),
                ('usage', models.ManyToManyField(related_name='usage_category_usage', to='reservations.Usage', verbose_name='usage')),
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
                ('age', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facility_fee_age', to='reservations.age', verbose_name='age')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facility_fee_place', to='reservations.place', verbose_name='place')),
                ('time', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facility_fee_time', to='reservations.time', verbose_name='time')),
            ],
        ),
        migrations.CreateModel(
            name='EquipmentFee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fee', models.IntegerField(verbose_name='料金')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='equipment_fee_equipment', to='reservations.equipment', verbose_name='equipment')),
            ],
        ),
        migrations.AddField(
            model_name='equipment',
            name='place',
            field=models.ManyToManyField(related_name='equipment_place', to='reservations.Place', verbose_name='place'),
        ),
        migrations.CreateModel(
            name='DefferdPayment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('reason', models.CharField(max_length=50, verbose_name='後納の理由')),
                ('fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='後納料')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='defferd_payment_reservation', to='reservations.reservation', verbose_name='reservation')),
            ],
        ),
        migrations.CreateModel(
            name='ApprovalApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('usage_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='利用料')),
                ('heating_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='暖房料')),
                ('electric_fee', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20000)], verbose_name='電気料')),
                ('conditions', models.TextField(blank=True, max_length=255, null=True, verbose_name='承認の条件')),
                ('cancellation_reason', models.TextField(blank=True, max_length=255, null=True, verbose_name='キャンセルの理由')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('approval', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='approval_app_approval', to='reservations.approval', verbose_name='approval')),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approval_app_reservation', to='reservations.reservation', verbose_name='reservation')),
            ],
        ),
        migrations.CreateModel(
            name='AgeCategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('age', models.ManyToManyField(related_name='age_category_age', to='reservations.Age', verbose_name='age')),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='age_category_reservation', to='reservations.reservation', verbose_name='reservation')),
            ],
        ),
    ]
