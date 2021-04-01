from django.urls import path
from . import views
from django.contrib.admin.sites import AdminSite

app_name = 'business_diary'

admin_site = AdminSite()

urlpatterns = [
    path('', admin_site.admin_view(views.index), name='index'),
    path('csv/', admin_site.admin_view(views.csv_view), name='csv'),
]
