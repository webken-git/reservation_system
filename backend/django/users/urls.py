from django.urls import path, include
from rest_framework import routers
from users import views

app_name = 'users'

router = routers.SimpleRouter()
router.register('users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #     path('', views.UserListView.as_view()),
    #     path('<int:pk>/', views.UserDetailView.as_view()),
]
