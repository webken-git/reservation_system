from django.contrib import admin
from documents.models import DocumentTemplate, Document

# Register your models here.


class DocumentTemplateAdmin(admin.ModelAdmin):
  list_display = [f.name for f in DocumentTemplate._meta.fields]
  list_display_links = ('id', 'name')


class DocumentAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Document._meta.fields]
  list_display_links = ('id', 'file_name')


admin.site.register(DocumentTemplate, DocumentTemplateAdmin)
admin.site.register(Document, DocumentAdmin)
