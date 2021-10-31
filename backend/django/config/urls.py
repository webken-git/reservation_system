"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
# from django.conf.urls.static import static
from django.urls import path, include, re_path
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView, LoginView, LogoutView
from users import views
from users.urls import router as users_router
from reservations.urls import router as reservations_router
from announcements.urls import router as announcements_router
from application_documents.urls import router as application_documents_router
from questionnaire.urls import router as questionnaire_router


router = routers.DefaultRouter()
router.registry.extend(users_router.registry)
router.registry.extend(reservations_router.registry)
router.registry.extend(announcements_router.registry)
router.registry.extend(application_documents_router.registry)
router.registry.extend(questionnaire_router.registry)

reference_uris = [
    path('download/', SpectacularAPIView.as_view(), name='schema'),
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

api_uris = [
    path('', include(router.urls)),
    # path('', include('application_documents.urls')),
    path('', include('reservations.urls')),
    path('', include('questionnaire.urls')),
    path('reference/', include(reference_uris)),
]

account_uris = [
    path('auth-user/', views.AuthInfoGetView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('staff-login/', views.StaffLoginView.as_view()),
    path('superuser-login/', views.SuperUserLoginView.as_view()),
    path('reset/password/', PasswordResetView.as_view()),
    path('reset/password/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('register/', RegisterView.as_view()),
    path('confirm/<str:key>/', ConfirmEmailView.as_view()),
    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('confirm/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^confirm/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
]

urlpatterns = [
    path('admin/business_diary/', include('business_diary.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(api_uris)),
    path('account/', include(account_uris)),
]

if getattr(settings, 'REST_USE_JWT', False):
  from rest_framework_simplejwt.views import TokenVerifyView, TokenObtainPairView

  from dj_rest_auth.jwt_auth import get_refresh_view

  account_uris += [
      path('token/', TokenObtainPairView.as_view()),
      path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
      path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
  ]
