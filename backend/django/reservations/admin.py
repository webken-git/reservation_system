from django.contrib import admin
from reservations.models import (
    EquipmentFee, FacilityFee, Reservation, UserInfo, Place,
    Equipment, SpecialEquipment,
    Approval, ApprovalApplication,
    Age, Usage, Time, DefferdPayment,
    AgeCategory, UsageCategory,
    ReservationSuspensionSchedule
)

# Register your models here.


class ReservationSuspensionScheduleAdmin(admin.ModelAdmin):
  list_display = [f.name for f in ReservationSuspensionSchedule._meta.fields]
  list_display_links = ('id', 'start')


class ReservationAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Reservation._meta.fields]
  list_display_links = ('id', 'user')


class UserInfoAdmin(admin.ModelAdmin):
  list_display = [f.name for f in UserInfo._meta.fields]
  list_display_links = ('id', 'contact_name')


class PlaceAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Place._meta.fields]
  list_display_links = ('id', 'name')


class EquipmentAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Equipment._meta.fields]
  list_display_links = ('id', 'name')


class SpecialEquipmentAdmin(admin.ModelAdmin):
  list_display = [f.name for f in SpecialEquipment._meta.fields]
  list_display_links = ('id', 'name')


class ApprovalAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Approval._meta.fields]
  list_display_links = ('id', 'name')


class ApprovalApplicationAdmin(admin.ModelAdmin):
  list_display = [f.name for f in ApprovalApplication._meta.fields]
  list_display_links = ('id', 'name')


class AgeAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Age._meta.fields]
  list_display_links = ('id', 'name')


class UsageAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Usage._meta.fields]
  list_display_links = ('id', 'name')


class TimeAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Time._meta.fields]
  list_display_links = ('id', 'name')


class AgeCategoryAdmin(admin.ModelAdmin):
  list_display = [f.name for f in AgeCategory._meta.fields]
  list_display_links = ('id', )


class UsageCategoryAdmin(admin.ModelAdmin):
  list_display = [f.name for f in UsageCategory._meta.fields]
  list_display_links = ('id',)


class DefferdPaymentAdmin(admin.ModelAdmin):
  list_display = [f.name for f in DefferdPayment._meta.fields]
  list_display_links = ('id', 'reason')


class FacilityFeeAdmin(admin.ModelAdmin):
  list_display = [f.name for f in FacilityFee._meta.fields]
  list_display_links = ('id', 'place')


class EquipmentFeeAdmin(admin.ModelAdmin):
  list_display = [f.name for f in EquipmentFee._meta.fields]
  list_display_links = ('id', 'equipment')


admin.site.register(ReservationSuspensionSchedule, ReservationSuspensionScheduleAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(SpecialEquipment, SpecialEquipmentAdmin)
admin.site.register(Age, AgeAdmin)
admin.site.register(Usage, UsageAdmin)
admin.site.register(Time, TimeAdmin)
admin.site.register(AgeCategory, AgeCategoryAdmin)
admin.site.register(UsageCategory, UsageCategoryAdmin)
admin.site.register(DefferdPayment, DefferdPaymentAdmin)
admin.site.register(FacilityFee, FacilityFeeAdmin)
admin.site.register(EquipmentFee, EquipmentFeeAdmin)
