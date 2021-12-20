from rest_framework import serializers
from announcements.models import Announcement
from questionnaire.models import Questionnaire
from questionnaire.serializers import QuestionnaireSerializer


class AnnouncementSerializer(serializers.ModelSerializer):
  questionnaire = QuestionnaireSerializer(read_only=True)
  questionnaire_id = serializers.PrimaryKeyRelatedField(queryset=Questionnaire.objects.all(), write_only=True, required=False, allow_null=True, default=None)

  class Meta:
    model = Announcement
    fields = '__all__'
    extra_kwargs = {
        # 'questionnaire': {'required': False},
        'questionnaire_id': {'required': False}
    }

  def create(self, validated_data):
    validated_data['questionnaire'] = validated_data.get('questionnaire_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['questionnaire_id']

    return Announcement.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.title = validated_data.get('title', instance.title)
    instance.description = validated_data.get('description', instance.description)
    instance.questionnaire = validated_data.get('questionnaire_id', instance.questionnaire)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['questionnaire_id']
    instance.save()

    return instance
