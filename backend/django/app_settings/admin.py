from django.contrib import admin
from app_settings.models import AppSettings

# Register your models here.


class AppSettingsAdmin(admin.ModelAdmin):
  list_display = [f.name for f in AppSettings._meta.fields]
  # list_display_links = ('id', 'user')
  list_display_links = ('id',)


admin.site.register(AppSettings, AppSettingsAdmin)
