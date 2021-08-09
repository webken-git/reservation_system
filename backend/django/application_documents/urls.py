from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from application_documents import views

app_name = 'application_documents'

router = routers.SimpleRouter()
router.register('documents', views.DocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('test', views.a, name='test')
    path('new-documents/', views.CreateNewDocumentView.as_view()),
]
