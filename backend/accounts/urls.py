from django.urls import path, re_path
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from dj_rest_auth.registration import urls
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView
from accounts import views

app_name = 'accounts'

urlpatterns = [
    path('register/', urls.RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('password/reset/', PasswordResetView.as_view()),
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('list/', views.UserList.as_view()),
    path('list/<int:pk>', views.UserDetail.as_view()),
    # path('search/', views.SearchResults.as_view(), name='results'),
    # path('session/save/', views.sessionSave, name='save'),
]
