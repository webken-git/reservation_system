from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.shortcuts import redirect
from django.contrib.admin.sites import AdminSite
import os
import csv
from io import TextIOWrapper, StringIO
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .forms import UploadCsvFileForm
from .models import BusinessDiary

# Create your views here.


def index(request):
  def find_all_files(directory):
    """
    指定されたディレクトリの中身を再帰的に取得し、dictにする。

    Parameters
    ----------
    directory : str
      再帰的に取得したいディレクトリのpath

    Returns
    -------
    dir_dict : dict
      ただのファイルの場合はkeyがファイル名、valueが空のdict、
      ディレクトリの場合はkeyがディレクトリ名、valueがディレクトリの中身のdict、
      といったものを指定されたディレクトリの中身を再帰的に取得したdict。
    """

    files = os.listdir(directory)
    files_dir = [f for f in files if os.path.isdir(os.path.join(directory, f))]
    files_file = [f for f in files if os.path.isfile(os.path.join(directory, f))]

    dir_dict = {}

    # ディレクトリ
    for child_directory in files_dir:
      dir_dict[child_directory] = find_all_files(os.path.join(directory, child_directory))

    # ファイル
    for file in files_file:
      dir_dict[file] = {}

    return dir_dict

  docs = find_all_files("./static/docs")
  admin_site = AdminSite()
  context = {
      **admin_site.each_context(request),
      'title': '業務日誌',
      'is_nav_sidebar_enabled': False,
      'docs': docs
  }
  return TemplateResponse(request, 'business_diary/index.html', context)


def csv_view(request):
  if request.method == 'POST':
    # POST
    form = UploadCsvFileForm(request.POST, request.FILES)
    if form.is_valid():
      form_data = TextIOWrapper(request.FILES['file'], encoding='utf-8')
      csv_file = csv.reader(form_data)
      for line in csv_file:
        if BusinessDiary.objects.filter(id=line[0]).first() is None:
          business_diary = BusinessDiary()
          business_diary.entry_name = line[1]
          business_diary.content = line[2]
          business_diary.detail = line[3]
          business_diary.start = line[4]
          business_diary.end = line[5]
          business_diary.other = line[6]
          business_diary.created_at = line[7]
          business_diary.updated_at = line[8]
          business_diary.save()
  else:
    # GET
    form = UploadCsvFileForm()

  admin_site = AdminSite()
  context = {
      **admin_site.each_context(request),
      'title': 'CSV',
      'is_nav_sidebar_enabled': False,
      'form': form
  }
  return TemplateResponse(request, 'business_diary/csv.html', context)


@receiver(post_save, sender=BusinessDiary)
def change_csv_when_creating_business_diary(sender, instance, created, **kwargs):
  '''
  business_diaryが追加されたとき、CSVにも追加する
  '''
  if created:
    output_csv = './static/business_diary/csv/business_diary.csv'
    with open(output_csv, 'a', encoding='utf-8', newline='') as csv_file:
      writer = csv.writer(csv_file, quoting=csv.QUOTE_ALL)

      id = instance.id
      entry_name = instance.entry_name
      content = instance.content
      detail = instance.detail
      start = instance.start
      end = instance.end
      other = instance.other
      created_at = instance.created_at
      updated_at = instance.updated_at

      writer.writerow([id, entry_name, content, detail, start, end, other, created_at, updated_at])


def overwrite_csv():
  '''
  CSVを上書き
  '''
  output_csv = './static/business_diary/csv/business_diary.csv'
  business_diaries = BusinessDiary.objects.all()

  with open(output_csv, 'w', encoding='utf-8', newline='') as csv_file:
    writer = csv.writer(csv_file, quoting=csv.QUOTE_ALL)

    for business_diary in business_diaries:
      id = business_diary.id
      entry_name = business_diary.entry_name
      content = business_diary.content
      detail = business_diary.detail
      start = business_diary.start
      end = business_diary.end
      other = business_diary.other
      created_at = business_diary.created_at
      updated_at = business_diary.updated_at

      writer.writerow([id, entry_name, content, detail, start, end, other, created_at, updated_at])


@receiver(post_save, sender=BusinessDiary)
def overwrite_csv_when_updating_business_diary(sender, instance, created, **kwargs):
  '''
  business_diaryが更新されたとき、CSVを更新後のテーブルで上書き
  '''
  if not created:
    overwrite_csv()


@receiver(post_delete, sender=BusinessDiary)
def overwrite_csv_when_deleting_business_diary(**kwargs):
  '''
  business_diaryが削除されたとき、CSVを削除後のテーブルで上書き
  '''
  overwrite_csv()
