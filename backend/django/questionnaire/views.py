from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets, response, status, views
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from questionnaire.models import Choice, Question, Questionnaire, Answer, AnswerStatus
from questionnaire.serializers import (
    ChoiceSerializer, QuestionSerializer, QuestionnaireSerializer,
    AnswerSerializer, AnswerStatusSerializer
)


# キャッシュの期限
TIME_OUTS_5MINUTES = 60 * 5  # 5分
TIME_OUTS_30MINUTES = 60 * 30  # 30分


class ChoiceViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Choice.objects.all()
  serializer_class = ChoiceSerializer
  filter_fields = [f.name for f in Choice._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer
  filter_fields = [f.name for f in Question._meta.fields]
  filter_fields += ['choice__' + f.name for f in Choice._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionnaireViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Questionnaire.objects.all()
  serializer_class = QuestionnaireSerializer
  filter_fields = [f.name for f in Questionnaire._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AnswerViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer
  filter_fields = [f.name for f in Answer._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AnswerStatusViewSet(viewsets.ModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = AnswerStatus.objects.all()
  serializer_class = AnswerStatusSerializer
  filter_fields = [f.name for f in AnswerStatus._meta.fields]
  filter_fields += ['questionnaire__' + f.name for f in Questionnaire._meta.fields]
  filter_fields += ['answer__' + f.name for f in Answer._meta.fields]

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionQuestionnaireViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  serializer_class = QuestionnaireSerializer
  filter_fields = [f.name for f in Questionnaire._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]

  def get_queryset(self):
    question_pk = self.kwargs.get('question_pk')
    queryset = Questionnaire.objects.all().prefetch_related('question')
    return queryset.filter(question=question_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)
