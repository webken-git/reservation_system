from rest_framework import serializers
from application_documents.models import Document


class DocumentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Document
    fields = '__all__'
