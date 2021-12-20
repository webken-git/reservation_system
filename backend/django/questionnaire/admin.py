from django.contrib import admin
from questionnaire.models import Choice, Question, Questionnaire, Answer, AnswerStatus

# Register your models here.


class ChoiceAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Choice._meta.fields]
  list_display_links = ('id', 'choice')


class QuestionAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Question._meta.fields]
  list_display_links = ('id', 'question')


class QuestionnaireAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Questionnaire._meta.fields]
  list_display_links = ('id', 'title')


class AnswerAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Answer._meta.fields]
  list_display_links = ('id', 'user')


class AnswerStatusAdmin(admin.ModelAdmin):
  list_display = [f.name for f in AnswerStatus._meta.fields]
  list_display_links = ('id', 'user')


admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Questionnaire, QuestionnaireAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(AnswerStatus, AnswerStatusAdmin)
