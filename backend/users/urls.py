from django.conf import settings
from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView
from users import views
from django.views.decorators.cache import cache_page as view_cach_page

TIME_OUTS_30MINUTES = 60 * 30
TIME_OUTS_1DAY = 60 * 60 * 24
TIME_OUTS_1MONTH = TIME_OUTS_1DAY * 30

# キャッシュ期間のデフォルトは30分(60s * 30m)


def cache_page(view, timeouts=TIME_OUTS_1DAY):
  # キャッシュする用のmethod
  return view_cach_page(timeouts)(view)


app_name = 'users'
urlpatterns = [
    path('', cache_page(views.UserListView.as_view())),
    path('<int:pk>/', views.UserDetailView.as_view()),
    path('auth/', views.AuthInfoGetView.as_view()),
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
]

if getattr(settings, 'REST_USE_JWT', False):
  from rest_framework_simplejwt.views import TokenVerifyView, TokenObtainPairView

  from dj_rest_auth.jwt_auth import get_refresh_view

  urlpatterns += [
      path('token/', TokenObtainPairView.as_view()),
      #   path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
      path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
  ]
