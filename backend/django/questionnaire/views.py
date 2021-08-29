from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets
from questionnaire.models import Choice, Question, Questionnaire, Answer, AnswerStatus
from questionnaire.serializers import (
    ChoiceSerializer, QuestionSerializer, QuestionnaireSerializer,
    AnswerSerializer, AnswerStatusSerializer
)
from users import permissions


# キャッシュの期限
TIME_OUTS_5MINUTES = 60 * 5  # 5分
TIME_OUTS_30MINUTES = 60 * 30  # 30分


class ChoiceViewSet(viewsets.ModelViewSet):
  queryset = Choice.objects.all()
  serializer_class = ChoiceSerializer
  filter_fields = [f.name for f in Choice._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer
  filter_fields = [f.name for f in Question._meta.fields]
  filter_fields += ['choice__' + f.name for f in Choice._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionnaireViewSet(viewsets.ModelViewSet):
  queryset = Questionnaire.objects.all()
  serializer_class = QuestionnaireSerializer
  filter_fields = [f.name for f in Questionnaire._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'create', 'destroy'],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AnswerViewSet(viewsets.ModelViewSet):
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer
  filter_fields = [f.name for f in Answer._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: ['update', 'partial_update', 'create'],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AnswerStatusViewSet(viewsets.ModelViewSet):
  queryset = AnswerStatus.objects.all()
  serializer_class = AnswerStatusSerializer
  filter_fields = [f.name for f in AnswerStatus._meta.fields]
  filter_fields += ['questionnaire__' + f.name for f in Questionnaire._meta.fields]
  filter_fields += ['answer__' + f.name for f in Answer._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['destroy'],
      permissions.IsAuthenticated: ['update', 'partial_update', 'create'],
      permissions.AllowAny: ['list', 'retrieve']
  }

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_30MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionQuestionnaireViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = QuestionnaireSerializer
  filter_fields = [f.name for f in Questionnaire._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

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


class ChoiceQuestionViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = QuestionSerializer
  filter_fields = [f.name for f in Question._meta.fields]
  filter_fields += ['choice__' + f.name for f in Choice._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    choice_pk = self.kwargs.get('choice_pk')
    queryset = Question.objects.all().prefetch_related('choice')
    return queryset.filter(choice=choice_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionAnswerViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = AnswerSerializer
  filter_fields = [f.name for f in Answer._meta.fields]
  filter_fields += ['question__' + f.name for f in Question._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    question_pk = self.kwargs.get('question_pk')
    queryset = Answer.objects.all().prefetch_related('question')
    return queryset.filter(question=question_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class QuestionnaireAnswerStatusViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = AnswerStatusSerializer
  filter_fields = [f.name for f in AnswerStatus._meta.fields]
  filter_fields += ['questionnaire__' + f.name for f in Questionnaire._meta.fields]
  filter_fields += ['answer__' + f.name for f in Answer._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    questionnaire_pk = self.kwargs.get('questionnaire_pk')
    queryset = AnswerStatus.objects.all().prefetch_related('questionnaire')
    return queryset.filter(questionnaire=questionnaire_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)


class AnswerAnswerStatusViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = AnswerStatusSerializer
  filter_fields = [f.name for f in AnswerStatus._meta.fields]
  filter_fields += ['questionnaire__' + f.name for f in Questionnaire._meta.fields]
  filter_fields += ['answer__' + f.name for f in Answer._meta.fields]
  permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: [],
      permissions.IsAuthenticated: [],
      permissions.AllowAny: ['list', 'retrieve']
  }

  def get_queryset(self):
    answer_pk = self.kwargs.get('answer_pk')
    queryset = AnswerStatus.objects.all().prefetch_related('answer')
    return queryset.filter(answer=answer_pk)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)

  @method_decorator(vary_on_cookie)
  @method_decorator(cache_page(TIME_OUTS_5MINUTES))
  def retrieve(self, request, *args, **kwargs):
    return super().retrieve(request, *args, **kwargs)
