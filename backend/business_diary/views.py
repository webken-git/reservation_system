from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.shortcuts import redirect
from django.contrib.admin.sites import AdminSite
import os
import csv
from io import TextIOWrapper, StringIO
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import datetime

import pygments

from .forms import UploadCsvFileForm
from .models import BusinessDiary, Content

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

  docs = find_all_files("/home/webhok/www/reservation_system/backend/static/docs")
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
        if Content.objects.filter(id=line[0]).first() is None:
          businessdiary = BusinessDiary()
          content = Content()
          if BusinessDiary.objects.filter(id=line[1]).first() is None:
            businessdiary.id = line[1]
            businessdiary.entry_name = line[2]
            businessdiary.start = line[5]
            businessdiary.end = line[6]
            businessdiary.other = line[7]
            businessdiary.created_at = line[8]
            businessdiary.updated_at = line[9]
            businessdiary.save()
            content.business_diary = BusinessDiary.objects.get(pk=line[1])
            content.content = line[3]
            content.detail = line[4]
            content.save()
          else:
            content.business_diary = BusinessDiary.objects.get(pk=line[1])
            content.content = line[3]
            content.detail = line[4]
            content.save()
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


# @receiver(post_save, sender=BusinessDiary)
@receiver(post_save, sender=Content)
def change_csv_when_creating_business_diary(sender, instance, created, **kwargs):
  '''
  business_diaryが追加されたとき、CSVにも追加する
  '''
  if created:
    output_csv = '/home/webhok/www/reservation_system/backend/static/business_diary/csv/business_diary.csv'
    with open(output_csv, 'a', encoding='utf-8', newline='') as csv_file:
      writer = csv.writer(csv_file, quoting=csv.QUOTE_ALL)

      pk = instance.id
      fk = instance.business_diary.id
      entry_name = instance.business_diary.entry_name
      content = instance.content
      detail = instance.detail
      start = instance.business_diary.start
      end = instance.business_diary.end
      other = instance.business_diary.other
      created_at = instance.business_diary.created_at
      updated_at = instance.business_diary.updated_at

      writer.writerow([pk, fk, entry_name, content, detail, start, end, other, created_at, updated_at])


def overwrite_csv():
  '''
  CSVを上書き
  '''
  output_csv = '/home/webhok/www/reservation_system/backend/static/business_diary/csv/business_diary.csv'
  bd_contents = Content.objects.all()

  with open(output_csv, 'w', encoding='utf-8', newline='') as csv_file:
    writer = csv.writer(csv_file, quoting=csv.QUOTE_ALL)

    for bd_content in bd_contents:
      pk = bd_content.id
      fk = bd_content.business_diary.id
      entry_name = bd_content.business_diary.entry_name
      content = bd_content.content
      detail = bd_content.detail
      start = bd_content.business_diary.start
      end = bd_content.business_diary.end
      other = bd_content.business_diary.other
      created_at = bd_content.business_diary.created_at
      updated_at = bd_content.business_diary.updated_at

      writer.writerow([pk, fk, entry_name, content, detail, start, end, other, created_at, updated_at])


@receiver(post_save, sender=Content)
def overwrite_csv_when_updating_business_diary(sender, instance, created, **kwargs):
  '''
  business_diaryが更新されたとき、CSVを更新後のテーブルで上書き
  '''
  if not created:
    overwrite_csv()


@receiver(post_delete, sender=Content)
def overwrite_csv_when_deleting_business_diary(**kwargs):
  '''
  business_diaryが削除されたとき、CSVを削除後のテーブルで上書き
  '''
  overwrite_csv()


def md_to_pdf(file_path, output_html):
  import markdown
  import pdfkit
#  import winreg

  with open(file_path, 'rt', encoding='utf-8') as f:
    text = f.read()

    # md -> html
    md = markdown.Markdown()
    body = md.convert(text)
    # HTML書式に合わせる
    html = '<html lang="ja"><meta charset="utf-8"><body>'
    # Pygmentsで作成したスタイルシートを取り込む
    html += '<style> body { font-size: 1rem; } </style>'
    # Tableタグに枠線を付けるためにスタイルを追加
    # html += '''<style> table,th,td {
    #         border-collapse: collapse;
    #         border:1px solid #333;
    #         } </style>'''

    html += body + '</body></html>'
    with open(output_html, "w", encoding="utf-8") as g:
      g.write(html)
  # outfile = output_pdf + '.pdf'
  print(output_html)
  output_pdf = output_html + '.pdf'

  # デバイスにwkhtmltopdfがインストールされている場合、htmlをpdfに変換
#  try:
#    with winreg.OpenKeyEx(winreg.HKEY_LOCAL_MACHINE, r'SOFTWARE\wkhtmltopdf',
#                          access=winreg.KEY_READ | winreg.KEY_WOW64_64KEY) as k:
#      data, regtype = winreg.QueryValueEx(k, "PdfPath")
#      configure = pdfkit.configuration(wkhtmltopdf=data)
#      regtype = regtype
#
#      pdfkit.from_string(html, output_pdf)
#  except FileNotFoundError:
#    pass



@receiver(post_save, sender=Content)
def generate_markdown(sender, instance, created, **kwargs):
  '''
  business_diaryが追加されたとき、CSVにも追加する
  '''
  if created:
    entry_name = instance.business_diary.entry_name
    sdate = str(instance.business_diary.start)
    date = str(datetime.datetime.strptime(sdate, '%Y-%m-%d %H:%M:%S%z').strftime('%Y%m%d'))

    dir_path = '/home/webhok/www/reservation_system/backend/static/docs/business_diary/' + entry_name + '/'
    file = date + '_' + entry_name + '.md'

    # ディレクトリが存在していない場合作成する
    os.makedirs(dir_path + 'md/', exist_ok=True)

    file_path = os.path.join(dir_path + 'md/', file)

    with open(file_path, 'w', encoding='utf-8') as md_file:
      contents = Content.objects.filter(business_diary=instance.business_diary.id).values_list('content', 'detail')

      start = str(datetime.datetime.strptime(str(instance.business_diary.start), '%Y-%m-%d %H:%M:%S%z').strftime('%Y-%m-%d %H:%M:%S'))
      end = str(datetime.datetime.strptime(str(instance.business_diary.end), '%Y-%m-%d %H:%M:%S%z').strftime('%Y-%m-%d %H:%M:%S'))
      other = instance.business_diary.other

      # mdファイルに書き込むテキスト
      file_content = '# 業務日誌\n\n## 記入者\n\n' + entry_name + '\n\n## 業務開始日時\n\n' + start + '\n\n## 業務終了日時\n\n' + end + '\n\n## 業務内容\n\n'
      md_file.write(file_content)
      # 動的フォームの部分は1件ずつ書き込む
      for i in contents:
        file_content = '- ' + i[0] + '\n\t- ' + i[1] + '\n'
        md_file.write(file_content)
      file_content = '\n## その他\n\n' + other
      md_file.write(file_content)
    # 出力するhtmlファイルの保存先の指定
    output_html = dir_path + file + '.html'
    md_to_pdf(file_path, output_html)
