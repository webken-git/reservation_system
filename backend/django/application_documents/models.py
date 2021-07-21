from django.db import models
from django.core import validators
from django.db.models.fields.related import ForeignKey

# Create your models here.


class Document(models.Model):
  name = models.CharField('書類名', max_length=25)
  url = models.TextField('ファイルパス', blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name
