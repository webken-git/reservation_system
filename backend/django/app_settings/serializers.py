from rest_framework import serializers
from app_settings.models import AppSettings, AutoMail
from users.models import User
from users.serializers import UserSerializer


class AppSettingsSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

  class Meta:
    model = AppSettings
    fields = '__all__'

  # create時にis_receive_announcement_email, is_receive_reminder_emailをTrueとして保存する
  def create(self, validated_data):
    validated_data['user'] = validated_data.get('user_id', None)
    del validated_data['user_id']
    validated_data['is_receive_announcement_email'] = True
    validated_data['is_receive_reminder_email'] = True
    return AppSettings.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.is_receive_announcement_email = validated_data.get('is_receive_announcement_email', instance.is_receive_announcement_email)
    instance.is_receive_reminder_email = validated_data.get('is_receive_reminder_email', instance.is_receive_reminder_email)
    instance.user = validated_data.get('user_id', instance.user)
    del validated_data['user_id']
    instance.save()
    return instance


class AutoMailSerializer(serializers.ModelSerializer):
  class Meta:
    model = AutoMail
    fields = '__all__'


class SendMailSerializer(serializers.Serializer):
  subject = serializers.CharField(max_length=30)
  body = serializers.CharField(style={'base_template': 'textarea.html'}, max_length=1000)

  class Meta:
    model = AutoMail
    fields = 'subject', 'body'
