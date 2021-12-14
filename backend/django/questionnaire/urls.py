from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from questionnaire import views

app_name = 'questionnaire'

router = routers.SimpleRouter()
router.register('choices', views.ChoiceViewSet)
router.register('questions', views.QuestionViewSet)
router.register('questionnaire', views.QuestionnaireViewSet)
router.register('answers', views.AnswerViewSet)
router.register('answer-statuses', views.AnswerStatusViewSet)

choice_router = nested_routers.NestedSimpleRouter(
    router,
    'choices',
    lookup='choice'
)

question_router = nested_routers.NestedSimpleRouter(
    router,
    'questions',
    lookup='question'
)

questionnaire_router = nested_routers.NestedSimpleRouter(
    router,
    'questionnaire',
    lookup='questionnaire'
)

answer_router = nested_routers.NestedSimpleRouter(
    router,
    'answers',
    lookup='answer'
)

choice_router.register(
    'questions',
    views.ChoiceQuestionViewSet,
    basename='choice-question',
)

question_router.register(
    'questionnaire',
    views.QuestionQuestionnaireViewSet,
    basename='question-questionnaire'
)

question_router.register(
    'answers',
    views.QuestionAnswerViewSet,
    basename='question-answer'
)

questionnaire_router.register(
    'answer-statuses',
    views.QuestionnaireAnswerStatusViewSet,
    basename='questionnaire-answer-status'
)

answer_router.register(
    'answer-statuses',
    views.AnswerAnswerStatusViewSet,
    basename='answer-answer-status'
)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(choice_router.urls)),
    path('', include(question_router.urls)),
    path('', include(questionnaire_router.urls)),
    path('', include(answer_router.urls)),
]
