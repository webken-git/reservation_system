from django.contrib import admin
from business_diary.models import BusinessDiary, Content

# Register your models here.


# class BusinessDiaryAdmin(admin.ModelAdmin):
#   list_display = ('id', 'entry_name', 'content', 'detail', 'start', 'end', 'other', 'created_at', 'updated_at')
#   list_display_links = ('id', 'entry_name')


# admin.site.register(BusinessDiary, BusinessDiaryAdmin)

# @admin.register(Content)
class ContentInline(admin.StackedInline):
  model = Content
  extra = 1


class ContentAdmin(admin.ModelAdmin):
  list_display = ('id', 'content', 'detail', 'business_diary', 'created_at', 'updated_at')
  list_display_links = ('id', 'content')

# @admin.register(BusinessDiary)


class BusinessDiaryAdmin(admin.ModelAdmin):
  list_display = ('id', 'entry_name', 'start', 'end', 'other', 'created_at', 'updated_at')
  list_display_links = ('id', 'entry_name')
  inlines = [ContentInline]


admin.site.register(BusinessDiary, BusinessDiaryAdmin)
admin.site.register(Content, ContentAdmin)
