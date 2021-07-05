from django.db import models
from django.utils import timezone
import uuid
import markdown
# Create your models here.


class BusinessDiary(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  entry_name = models.CharField('記入者', max_length=10)
  start = models.DateTimeField('開始日時')
  end = models.DateTimeField('終了日時')
  other = models.CharField('その他', max_length=50, null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.entry_name

  # def markdown_to_html(self):
  #   """Markdown を HTML に変換して出力
  #   さらに拡張機能を使用して目次を自動生成する"""
  #   md = markdown.Markdown(
  #       extensions=['extra', 'admonition', 'sane_lists', 'toc'])
  #   html = md.convert(self.content)
  #   return html


# 動的フィールドのデータ
class Content(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  content = models.CharField('業務内容', max_length=50)
  detail = models.TextField('詳細', null=True, blank=True)
  business_diary = models.ForeignKey(
      BusinessDiary, verbose_name='紐づく業務日誌',
      blank=True, null=True,
      on_delete=models.SET_NULL
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  # def markdown_to_html(self):
  #   """Markdown を HTML に変換して出力
  #   さらに拡張機能を使用して目次を自動生成する"""
  #   md = markdown.Markdown(
  #       extensions=['extra', 'admonition', 'sane_lists', 'toc'])
  #   html = md.convert(self.content)
  #   return html
