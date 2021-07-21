from django.db import models
from django.db.models.fields.related import ForeignKey
from users.models import User


# Create your models here.

class Choice(models.Model):
  choice = models.CharField('選択肢', max_length=15, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.choice


class Question(models.Model):
  question = models.CharField('質問', max_length=50)
  choice = models.ManyToManyField(
      Choice,
      verbose_name='question_choice',
      related_name='question_choice',
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.question


class Questionnaire(models.Model):
  title = models.CharField('タイトル', max_length=25)
  overview = models.CharField('概要', max_length=150, blank=True, null=True)
  deadline = models.DateTimeField('回答期限', blank=True, null=True)
  question = models.ManyToManyField(
      Question,
      verbose_name='questionnaire_question',
      related_name='questionnaire_question',
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title


class Answer(models.Model):
  user = models.ForeignKey(
      User, verbose_name='answer_user',
      blank=True, null=True,
      related_name='answer_user',
      on_delete=models.SET_NULL
  )
  question = models.ForeignKey(
      Question, verbose_name='answer_question',
      blank=True, null=True,
      related_name='answer_question',
      on_delete=models.SET_NULL
  )
  answer = models.TextField('回答', blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.answer


class AnswerStatus(models.Model):
  user = models.ForeignKey(
      User, verbose_name='answerstatus_user',
      blank=True, null=True,
      related_name='answerstatus_user',
      on_delete=models.SET_NULL
  )
  questionnaire = models.ForeignKey(
      Questionnaire, verbose_name='answerstatus_questionnaire',
      blank=True, null=True,
      related_name='answerstatus_questionnaire',
      on_delete=models.CASCADE
  )
  answer = models.ManyToManyField(
      Answer,
      verbose_name='answerstatus_answer',
      related_name='answerstatus_answer',
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
