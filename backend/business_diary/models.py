from django.db import models
from django.utils import timezone

# Create your models here.


class BusinessDiary(models.Model):
  entry_name = models.CharField('記入者', max_length=10)
  content = models.CharField('業務内容', max_length=50)
  detail = models.TextField('詳細', null=True, blank=True)
  start = models.DateTimeField('開始日時')
  end = models.DateTimeField('終了日時')
  other = models.CharField('その他', max_length=50, null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.entry_name + ' ' + self.content
