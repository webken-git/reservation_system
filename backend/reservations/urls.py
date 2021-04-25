from django.conf import settings
from django.urls import path
from reservations import views

# app_name = 'users'
urlpatterns = [
    path('', views.ReservationCreateView.as_view()),
    path('<int:pk>/', views.ReservationDetailsView.as_view()),
    path('places/', views.PlaceCreateView.as_view()),
    path('places/<int:pk>/', views.PlaceDetailsView.as_view()),
]
