from django.contrib import admin
from application_documents.models import Document

# Register your models here.


class DocumentAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Document._meta.fields]
  list_display_links = ('id', 'name')


admin.site.register(Document, DocumentAdmin)
