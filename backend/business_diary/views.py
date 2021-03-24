from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.shortcuts import redirect
from django.contrib.admin.sites import AdminSite
import os

from .forms import UploadCsvFileForm

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


def csv_home(request):
  form = UploadCsvFileForm()

  admin_site = AdminSite()
  context = {
      **admin_site.each_context(request),
      'title': 'CSV',
      'is_nav_sidebar_enabled': False,
      'form': form
  }
  return TemplateResponse(request, 'business_diary/csv/home.html', context)


def csv_upload(request):
  if request.method == 'POST':
    form = UploadCsvFileForm(request.POST, request.FILES)
    if form.is_valid():
      return HttpResponse("a")

  return redirect('/admin/business_diary/csv')
