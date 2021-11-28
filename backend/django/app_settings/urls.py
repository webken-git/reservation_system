from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from app_settings import views

app_name = 'app_settings'

router = routers.SimpleRouter()

router.register('app-settings', views.AppSettingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
