from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from announcements import views

app_name = 'annnouncements'

router = routers.SimpleRouter()

router.register('announcements', views.AnnouncementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
