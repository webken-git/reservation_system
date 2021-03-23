from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.template import loader
from django.contrib.admin.sites import AdminSite
import os


# Create your views here.
def index(request):
  def find_all_files(directory):
    dir_dict = {}
    for file in os.listdir(directory):
      if os.path.isdir(os.path.join(directory, file)):
        dir_dict[file] = find_all_files(os.path.join(directory, file))
      else:
        dir_dict[file] = {}

    return dir_dict

  template = loader.get_template('business_diary/index.html')
  docs = find_all_files("../docs")
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
