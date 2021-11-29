from django.contrib import admin
from announcements.models import Announcement

# Register your models here.


class AnnouncementAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Announcement._meta.fields]
  list_display_links = ('id', 'title')


admin.site.register(Announcement, AnnouncementAdmin)
