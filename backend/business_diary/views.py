from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.template import loader
from django.contrib.admin.sites import AdminSite
import os


# Create your views here.
def index(request):
  def find_all_files(directory):
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

  template = loader.get_template('business_diary/index.html')
  docs = find_all_files("./static/docs")
  print(docs)
  admin_site = AdminSite()
  context = {
      **admin_site.each_context(request),
      'title': '業務日誌',
      'is_nav_sidebar_enabled': False,
      'docs': docs
  }
  return TemplateResponse(request, template, context)


def directory(request, dir):
  return HttpResponse(dir)
