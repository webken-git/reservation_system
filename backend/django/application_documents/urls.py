from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from application_documents import views

app_name = 'application_documents'

router = routers.SimpleRouter()
router.register('documents', views.DocumentViewSet)
router.register('new-documents', views.CreateNewDocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
