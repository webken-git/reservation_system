from django.db import models
from django.core import validators
from django.db.models.fields.related import ForeignKey
from reservations.models import ApprovalApplication

# Create your models here.


class DocumentTemplate(models.Model):
  name = models.CharField('書類名', max_length=25)
  url = models.TextField('ファイルパス', blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name


class Document(models.Model):
  number = models.IntegerField('発行番号', blank=True, null=True)
  file_name = models.CharField('ファイル名', max_length=150)
  approval_application = models.ForeignKey(
      ApprovalApplication, verbose_name='document_approvalapplication',
      related_name='document_approvalapplication',
      blank=True, null=True,
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
