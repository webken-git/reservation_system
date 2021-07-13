from django_filters import rest_framework as filters
from reservations.models import Reservation


class ReservationFilter(filters.FilterSet):
  # フィルタの定義
  # start__month = filters.NumberFilter(field_name='start', lookup_expr='month')
  # start__day = filters.NumberFilter(field_name='start', lookup_expr='day')
  start = filters.DateFilter(lookup_expr='contains')
  end = filters.DateFilter(lookup_expr='contains')

  class Meta:
    model = Reservation
    # フィルタを列挙する。
    # デフォルトの検索方法でいいなら、モデルフィールド名のフィルタを直接定義できる。
    fields = [f.name for f in Reservation._meta.fields]
