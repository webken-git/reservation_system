from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class MyUserChangeForm(UserChangeForm):
  class Meta:
    model = User
    fields = '__all__'


class MyUserCreationForm(UserCreationForm):
  class Meta:
    model = User
    fields = ('email',)


class MyUserAdmin(UserAdmin):
  fieldsets = (
      (None, {'fields': ('email', 'password')}),
      ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                  'groups', 'user_permissions')}),
      ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2'),
      }),
  )
  form = MyUserChangeForm
  add_form = MyUserCreationForm
  list_display = ('email', 'is_staff')
  list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
  search_fields = ('email',)
  ordering = ('email',)


admin.site.register(User, MyUserAdmin)
