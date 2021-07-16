from django_filters import rest_framework as filters
from reservations.models import Reservation, ReservationSuspensionSchedule


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
