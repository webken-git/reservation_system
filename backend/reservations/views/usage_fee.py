from django.db.models import Q
from django.contrib import messages
from reservations.models import (
    Reservation, FacilityFee,
    EquipmentFee, ApprovalApplication
)


class UsageFeeCalculation:
  def __init__(self, model, request):
    self.model = model
    self.request = request

  def calculate_facility_fee(self):
    queryset = self.model.objects.order_by('id')
    private = queryset.filter(ages__id=self.request.data['ages'], places__id=self.request.data['places'], is_group=self.request.data['is_group'])
    return private


def calculate_wrap(request):
  i = UsageFeeCalculation(FacilityFee, request)
  return i.calculate_facility_fee()
