# Generated by Django 4.0 on 2021-12-17 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='approvalapplication',
            name='cancellation_reason',
        ),
    ]
