from django.db import models

# Create your models here.


class BusinessDiary(models.Model):
  name = models.CharField(max_length=10)
