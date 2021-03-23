from django.conf import settings
from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView
from users import views

# app_name = 'users'

urlpatterns = [
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    #     path('change-email/', views.UserEmailUpdate.as_view(), name='change_email'),
    path('<int:pk>/', views.UserDetail.as_view()),

    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
    # path('search/', views.SearchResults.as_view(), name='results'),
]

if getattr(settings, 'REST_USE_JWT', False):
  from rest_framework_simplejwt.views import TokenVerifyView

  from dj_rest_auth.jwt_auth import get_refresh_view

  urlpatterns += [
      path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
      path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
  ]
