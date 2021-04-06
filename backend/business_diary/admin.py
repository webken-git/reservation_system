from django.contrib import admin
from business_diary.models import BusinessDiary

# Register your models here.


# class BusinessDiaryAdmin(admin.ModelAdmin):
#   list_display = ('id', 'entry_name', 'content', 'detail', 'start', 'end', 'other', 'created_at', 'updated_at')
#   list_display_links = ('id', 'entry_name')


# admin.site.register(BusinessDiary, BusinessDiaryAdmin)
@admin.register(BusinessDiary)
class BusinessDiaryAdmin(admin.ModelAdmin):
  list_display = ('entry_name', 'content', 'detail', 'start', 'end', 'other', 'created_at', 'updated_at')
  list_display_links = ('entry_name', 'content')
