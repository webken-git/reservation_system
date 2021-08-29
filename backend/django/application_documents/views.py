from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets, response, status, mixins
import datetime
import pytz
import os
import docx
from users import permissions
from application_documents.models import *
from application_documents.serializers import DocumentSerializer
from reservations.models import ApprovalApplication, UsageCategorize, AgeCategorize


# データの変更が頻繫にあるAPIのキャッシュの期限は5分
TIME_OUTS_5MINUTES = 60 * 5
# 1日
TIME_OUTS_1DAY = 60 * 60 * 24
# マスターデータのキャッシュの期限は30日
TIME_OUTS_1MONTH = TIME_OUTS_1DAY * 30


def insert_string(string, index, add_string):
  return string[:index] + add_string + string[index:]


def create_new_word(request):
  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
  query = Document.objects.filter(id=request.data['id'])
  approval_applications = ApprovalApplication.objects.filter(id=request.data['approvalapplication_id'])
  usage_categorizes = UsageCategorize.objects.filter(reservation__id=approval_applications[0].reservation.id)
  age_categorizes = AgeCategorize.objects.filter(reservation__id=approval_applications[0].reservation.id)
  number = 1
  contact_name = approval_applications[0].reservation.contact_name
  approval = approval_applications[0].approval.name
  place = approval_applications[0].reservation.place.name
  usages = [usage_categorize.name for usage_categorize in usage_categorizes[0].usage.all()]
  ages = [age_categorize.name for age_categorize in age_categorizes[0].age.all()]
  start = approval_applications[0].reservation.start
  end = approval_applications[0].reservation.end
  start_hour = start.hour - 12
  end_hour = end.hour - 12
  purpose = approval_applications[0].reservation.purpose

  if query:
    file = BASE_DIR + query[0].url
    doc = docx.Document(file)
    tbl = doc.tables[0]

    # 稚内市体育施設使用等承認（不承認）通知書
    if query[0].name == '稚内市体育施設使用等承認（不承認）通知書':
      tbl.rows[0].cells[0].paragraphs[0].text = insert_string(tbl.rows[0].cells[0].paragraphs[0].text, 4, str(number))
      tbl.rows[0].cells[0].paragraphs[1].text = now.strftime('%Y 年 %m 月 %d 日').replace('年 0', '年 ').replace('月 0', '月 ')
      tbl.rows[0].cells[0].paragraphs[3].text = insert_string(tbl.rows[0].cells[0].paragraphs[3].text, 6, contact_name)
      tbl.rows[0].cells[0].paragraphs[10].text = tbl.rows[0].cells[0].paragraphs[10].text.replace('　　年', str(now.year) + ' 年').replace('　月', str(now.month) + ' 月').replace('　日', str(now.day) + ' 日')
      if approval == '承認':
        tbl.rows[0].cells[0].paragraphs[10].text = tbl.rows[0].cells[0].paragraphs[10].text.replace('□承認', '☑承認')
      elif approval == '不承認':
        tbl.rows[0].cells[0].paragraphs[10].text = tbl.rows[0].cells[0].paragraphs[10].text.replace('□不承認', '☑不承認')
      else:
        return {'error': '承認または不承認されたデータを指定してください。'}
      # 使用（利用）体育施設の名称
      tbl.rows[1].cells[1].paragraphs[0].text = insert_string(tbl.rows[1].cells[1].paragraphs[0].text, 5, place)
      # 使用（利用）区分
      if 'アマチュアスポーツ' in usages:
        tbl.rows[2].cells[1].paragraphs[0].text = tbl.rows[2].cells[1].paragraphs[0].text.replace('□アマチュア', '☑アマチュア')
      if '一般使用' in usages:
        tbl.rows[2].cells[1].paragraphs[0].text = tbl.rows[2].cells[1].paragraphs[0].text.replace('□一般使用', '☑一般使用')
      if '競技会使用' in usages:
        tbl.rows[2].cells[1].paragraphs[0].text = tbl.rows[2].cells[1].paragraphs[0].text.replace('□競技会使用', '☑競技会使用')
      if '非営利' in usages:
        tbl.rows[2].cells[1].paragraphs[1].text = tbl.rows[2].cells[1].paragraphs[1].text.replace('□非営利', '☑非営利')
        if '入場料を徴収する' in usages:
          tbl.rows[2].cells[1].paragraphs[1].text = tbl.rows[2].cells[1].paragraphs[1].text.replace('□入場料を徴収する', '☑入場料を徴収する')
        elif '入場料を徴収しない' in usages:
          tbl.rows[2].cells[1].paragraphs[1].text = tbl.rows[2].cells[1].paragraphs[1].text.replace('□入場料を徴収しない', '☑入場料を徴収しない')
      if '営利' in usages:
        tbl.rows[2].cells[1].paragraphs[2].text = tbl.rows[2].cells[1].paragraphs[2].text.replace('□営　利', '☑営　利')
        if '入場料を徴収する' in usages:
          tbl.rows[2].cells[1].paragraphs[2].text = tbl.rows[2].cells[1].paragraphs[2].text.replace('□入場料を徴収する', '☑入場料を徴収する')
        elif '入場料を徴収しない' in usages:
          tbl.rows[2].cells[1].paragraphs[2].text = tbl.rows[2].cells[1].paragraphs[2].text.replace('□入場料を徴収しない', '☑入場料を徴収しない')
      # 年齢区分
      if '幼児' in ages:
        tbl.rows[3].cells[1].paragraphs[0].text = tbl.rows[3].cells[1].paragraphs[0].text.replace('□幼児', '☑幼児')
      if '小学生' in ages:
        tbl.rows[3].cells[1].paragraphs[0].text = tbl.rows[3].cells[1].paragraphs[0].text.replace('□小学生', '☑小学生')
      if '中学生' in ages:
        tbl.rows[3].cells[1].paragraphs[0].text = tbl.rows[3].cells[1].paragraphs[0].text.replace('□中学生', '☑中学生')
      if '高校生' in ages:
        tbl.rows[3].cells[1].paragraphs[0].text = tbl.rows[3].cells[1].paragraphs[0].text.replace('□高校生', '☑高校生')
      if '大学生' in ages:
        tbl.rows[3].cells[1].paragraphs[0].text = tbl.rows[3].cells[1].paragraphs[0].text.replace('□大学生', '☑大学生')
      if '一般' in ages:
        tbl.rows[3].cells[1].paragraphs[1].text = tbl.rows[3].cells[1].paragraphs[1].text.replace('□一般', '☑一般')
      if '高齢者' in ages:
        tbl.rows[3].cells[1].paragraphs[1].text = tbl.rows[3].cells[1].paragraphs[1].text.replace('□高齢者', '☑高齢者')
      if '障害者' in ages:
        tbl.rows[3].cells[1].paragraphs[1].text = tbl.rows[3].cells[1].paragraphs[1].text.replace('□障害者', '☑障害者')
      tbl.rows[4].cells[1].paragraphs[0].text = tbl.rows[4].cells[1].paragraphs[0].text.replace('年', str(start.year) + ' 年').replace('　月', str(start.month) + ' 月').replace('　日', str(start.day) + ' 日').replace('　時', str(start.strftime('%I')) + ' 時').replace('　分', str(start.minute) + ' 分')
      tbl.rows[4].cells[1].paragraphs[1].text = tbl.rows[4].cells[1].paragraphs[1].text.replace('年', str(end.year) + ' 年').replace('　月', str(end.month) + ' 月').replace('　日', str(end.day) + ' 日').replace('　時', str(end.strftime('%I')) + ' 時').replace('　分', str(end.minute) + ' 分')
      if start_hour < 0:
        tbl.rows[4].cells[1].paragraphs[0].text = tbl.rows[4].cells[1].paragraphs[0].text.replace('前', '☑前')
      elif start_hour > 0:
        tbl.rows[4].cells[1].paragraphs[0].text = tbl.rows[4].cells[1].paragraphs[0].text.replace('後', '☑後')
      if end_hour < 0:
        tbl.rows[4].cells[1].paragraphs[1].text = tbl.rows[4].cells[1].paragraphs[1].text.replace('前', '☑前')
      elif end_hour > 0:
        tbl.rows[4].cells[1].paragraphs[1].text = tbl.rows[4].cells[1].paragraphs[1].text.replace('後', '☑後')
      tbl.rows[5].cells[1].paragraphs[0].text = insert_string(tbl.rows[5].cells[1].paragraphs[0].text, 0, purpose)
  else:
    return {'error': 'docxファイルの指定が違います。'}
  doc.save(BASE_DIR + '/static/application_documents/docx/' + now.strftime('%Y%m%d_') + query[0].name + '.docx')
  return BASE_DIR + '/static/application_documents/docx/' + now.strftime('%Y%m%d_') + query[0].name + '.docx'
  # return {'path': tbl.rows[5].cells[1].paragraphs[0].text}


class DocumentViewSet(viewsets.ModelViewSet):
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer
  filter_fields = [f.name for f in Document._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: ['list', 'retrieve'],
      permissions.AllowAny: []
  }

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class CreateNewDocumentViewSet(
        mixins.CreateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet):
  """
  申請書の作成と削除
  """
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: ['destroy'],
      permissions.AllowAny: ['create']
  }

  def create(self, request, *args, **kwargs):
    new_document = create_new_word(request)
    if new_document:
      return response.Response(new_document, status=status.HTTP_200_OK)
    else:
      return response.Response({'message': '失敗しました。'}, status=status.HTTP_400_BAD_REQUEST)

  def destroy(self, request, *args, **kwargs):
    return response.Response({'message': '削除しました。'}, status=status.HTTP_200_OK)
