from django.db import models
from rest_framework import serializers
from application_documents.models import DocumentTemplate, Document
from reservations.models import ApprovalApplication
from reservations.serializers import ApprovalApplicationSerializer
from application_documents import views


class DocumentTemplateSerializer(serializers.ModelSerializer):
  class Meta:
    model = DocumentTemplate
    fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
  approval_application = ApprovalApplicationSerializer(read_only=True)
  approval_application_id = serializers.PrimaryKeyRelatedField(queryset=ApprovalApplication.objects.all(), write_only=True)

  class Meta:
    model = Document
    fields = '__all__'
    extra_kwargs = {
        'file_name': {'required': False}
    }

  def create(self, validated_data):
    validated_data['approval_application'] = validated_data.get('approval_application_id', None)
    # validated_data['file_name'] = views.create_new_word()

    # PrimaryKeyRelatedFieldを削除
    del validated_data['approval_application_id']

    data = validated_data.pop('approval_application')
    document = Document.objects.create(**validated_data)
    document.save()
    document.approval_application.set(data)

    return document

  def update(self, instance, validated_data):
    # 更新処理
    instance.number = validated_data.get('number', instance.number)
    instance.file_name = validated_data.get('file_name', instance.file_name)
    validated_data['approval_application'] = validated_data.get('approval_application_id', instance.approval_application)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['approval_application_id']

    data = validated_data.pop('approval_application')
    instance.save()
    instance.approval_application.set(data)

    return instance
