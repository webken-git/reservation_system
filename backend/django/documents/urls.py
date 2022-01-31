from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from documents import views

app_name = 'application_documents'

router = routers.SimpleRouter()
router.register('document-templates', views.DocumentTemplateViewSet)
router.register('documents', views.DocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
