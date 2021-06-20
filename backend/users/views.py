from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, viewsets, filters
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView,
    RetrieveAPIView, UpdateAPIView
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from dj_rest_auth.views import LoginView
from users.models import User
from users.serializers import UserSerializer, StaffLoginSerializer, SuperUserLoginSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
  # permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer
  filter_fields = [f.name for f in User._meta.fields]


class UserListView(ListCreateAPIView):
  # permission_classes = [IsAdminUser]
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetailView(RetrieveUpdateDestroyAPIView):
  # permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserEmailUpdate(UpdateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer
  lookup_field = 'email'

# ログインユーザー情報を取得


class AuthInfoGetView(RetrieveAPIView):
  from rest_framework_simplejwt.tokens import RefreshToken
  permission_classes = [IsAuthenticated]
  serializer_class = UserSerializer

  def get(self, request, format=None):
    user = User.objects.get(id=request.user.id)
    return Response(data={
        'id': request.user.id,
        'password': request.user.password,
        'last_login': request.user.last_login,
        'email': request.user.email,
        'is_staff': request.user.is_staff,
        'is_active': request.user.is_active,
        'is_superuser': request.user.is_superuser,
        'created_at': request.user.created_at,
        'updated_at': request.user.updated_at,
        'refresh_token': str(RefreshToken.for_user(user)),
    }, status=HTTP_200_OK)

# スタッフログイン


class StaffLoginView(LoginView):
  serializer_class = StaffLoginSerializer

# スーパーユーザーログイン


class SuperUserLoginView(LoginView):
  serializer_class = SuperUserLoginSerializer
