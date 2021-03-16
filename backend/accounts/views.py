from django.shortcuts import render
from .models import User
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


class UserList(ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetail(RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer
