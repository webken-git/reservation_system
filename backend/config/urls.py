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
from django.conf.urls.static import static
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView


api_uris = [
    path(('users/'), include('users.urls')),
    path('reservations/', include('reservations.urls')),
    path('password/reset/', PasswordResetView.as_view()),
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]

doc_uris = [
    path("download/api/", SpectacularAPIView.as_view(), name='schema'),
    path("api/", SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

urlpatterns = [
    path('admin/business_diary/', include('business_diary.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(api_uris)),
    path('docs/', include(doc_uris)),
]
