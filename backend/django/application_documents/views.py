from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets, response, status, views
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import datetime
import pytz
import os
import docx
from application_documents.models import *
from application_documents.serializers import DocumentSerializer

print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# データの変更が頻繫にあるAPIのキャッシュの期限は5分
TIME_OUTS_5MINUTES = 60 * 5
# UserInfoなどのデータ変更はあまりないAPIのキャッシュの期限は1日
TIME_OUTS_1DAY = 60 * 60 * 24
# マスターデータのキャッシュの期限は30日
TIME_OUTS_1MONTH = TIME_OUTS_1DAY * 30


def insert_string(string, index, add_string):
  return string[:index] + add_string + string[index:]


class Word:
  def __init__(self, id):
    self.id = id
    # self.request = request

  def create(self):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    query = Document.objects.filter(id=self.id)
    file = BASE_DIR + query[0].url
    doc = docx.Document(file)
    tbl = doc.tables[0]
    values = []

    for row in tbl.rows:
      for cell in row.cells:
        values.append(cell.text)
    s = values[1]
    s.replace("\n", "")
    str = insert_string(s, 1, "10")
    return str


def word_create(id):
  i = Word(id)
  return i.create()


@api_view(['GET'])
def a(request):
  return response.Response(data=word_create(2))


class DocumentViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer
  filter_fields = [f.name for f in Document._meta.fields]

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
