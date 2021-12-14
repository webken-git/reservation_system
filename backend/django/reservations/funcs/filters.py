from django_filters import rest_framework as filters
from reservations.models import (
    Approval, Reservation, Place, ReservationSuspensionSchedule, ApprovalApplication,
)
from rest_framework.filters import BaseFilterBackend
import coreapi


class ReservationFilter(filters.FilterSet):
  # フィルタの定義
  # start__month = filters.NumberFilter(field_name='start', lookup_expr='month')
  # start__day = filters.NumberFilter(field_name='start', lookup_expr='day')
  start = filters.DateFilter(lookup_expr='contains')
  end = filters.DateFilter(lookup_expr='contains')

  class Meta:
    model = Reservation
    # フィルタを列挙
    fields = [f.name for f in Reservation._meta.fields]


class ReservationSuspensionScheduleFilter(filters.FilterSet):
  # フィルタの定義
  start = filters.DateFilter(lookup_expr='exact')
  end = filters.DateFilter(lookup_expr='exact')

  class Meta:
    model = ReservationSuspensionSchedule
    # フィルタを列挙
    fields = [f.name for f in ReservationSuspensionSchedule._meta.fields]


class ApprovalApplicationFilter(filters.FilterSet):
  # フィルタの定義
  reservation__start = filters.DateFilter(lookup_expr='contains')
  reservation__end = filters.DateFilter(lookup_expr='contains')

  class Meta:
    model = ApprovalApplication
    # フィルタを列挙
    fields = [f.name for f in ApprovalApplication._meta.fields]
    fields += ['approval__' + f.name for f in Approval._meta.fields]
    fields += ['reservation__' + f.name for f in Reservation._meta.fields]
    fields += ['reservation__place__' + f.name for f in Place._meta.fields]


class SwaggerQueryStringFilter(BaseFilterBackend):
  """
  create query string parameter for swagger
  """

  def get_schema_fields(self, view):
    fields = []
    for key, value in view.serializer_class._declared_fields.items():
      field = coreapi.Field(name=key, description=value.help_text, required=value.required, location="query",)
      fields.append(field)
    return fields