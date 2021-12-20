from rest_framework import permissions


class AllowAny(permissions.AllowAny):
  """
  全ユーザー許可
  """
  pass


class IsAuthenticated(permissions.IsAuthenticated):
  """
  一般ユーザー権限
  """
  pass


class IsAdminUser(permissions.IsAdminUser):
  """
  スタッフ権限
  """
  pass


class IsSuperUser(permissions.IsAdminUser):
  """
  スーパーユーザー権限
  """

  def has_permission(self, request, view):
    return bool(request.user and request.user.is_superuser)


class ActionBasedPermission(permissions.AllowAny):
  """
  Grant or deny access to a view, based on a mapping in view.action_permissions
  """

  def has_permission(self, request, view):
    for klass, actions in getattr(view, 'action_permissions', {}).items():
      if view.action in actions:
        return klass().has_permission(request, view)
    return False
