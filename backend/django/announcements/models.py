from django.db import models
from django.db.models.fields.related import ForeignKey
from questionnaire.models import Questionnaire


# Create your models here.


class Announcement(models.Model):
  title = models.CharField('タイトル', max_length=50, blank=True, null=True)
  description = models.TextField('内容', blank=True, null=True)
  questionnaire = models.ForeignKey(
      Questionnaire, verbose_name='announcement_questionnaire',
      blank=True, null=True,
      related_name='announcement_questionnaire',
      on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title
