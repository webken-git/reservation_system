from django.shortcuts import render
from rest_framework import authentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, viewsets
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView,
    RetrieveAPIView, UpdateAPIView
)
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import response, mixins
from dj_rest_auth.views import LoginView
from users import permissions
from users.models import User
from users.serializers import UserSerializer, StaffLoginSerializer, SuperUserLoginSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  filter_fields = [f.name for f in User._meta.fields]
  authentication_classes = [JWTCookieAuthentication]
  # permission_classes = [permissions.ActionBasedPermission]
  action_permissions = {
      permissions.IsAdminUser: ['update', 'partial_update', 'destroy'],
      permissions.IsAuthenticated: ['list', 'retrieve'],
      permissions.AllowAny: []
  }


class AuthInfoGetView(RetrieveAPIView):
  """
  ログインユーザー情報を取得
  """
  serializer_class = UserSerializer
  # permission_classes = [permissions.IsAuthenticated]
  # permission_classes = [permissions.ActionBasedPermission]
  # action_permissions = {
  #     permissions.IsAdminUser: [],
  #     permissions.IsAuthenticated: ['retrieve'],
  #     permissions.AllowAny: ['list']
  # }

  def get(self, request, format=None):
    user = User.objects.get(id=request.user.id)
    return response.Response(data={
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
    }, status=status.HTTP_200_OK)


class StaffLoginView(LoginView):
  """
  スタッフログイン
  """
  serializer_class = StaffLoginSerializer


class SuperUserLoginView(LoginView):
  """
  スーパーユーザーログイン
  """
  serializer_class = SuperUserLoginSerializer
