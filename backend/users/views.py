from django.shortcuts import render
from .models import User
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import UserSerializer


class UserList(ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserDetail(RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer


class UserEmailUpdate(UpdateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = User.objects.all()
  serializer_class = UserSerializer
  lookup_field = 'email'


# def pdf(request):
#   import glob
#   a = glob.glob("./static/docs/*/*.pdf", recursive=True)
#   b = glob.glob("./static/docs/*/*/*.pdf", recursive=True)
#   a.extend(b)

#   context = {'lists': a}

#   return render(request, 'docs/document_list.html', context)
