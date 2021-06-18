from django.conf import settings
from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from reservations.views import views

app_name = 'reservations'
router = routers.DefaultRouter()
router.register('approvals', views.ApprovalViewSet)
router.register('places', views.PlaceViewSet)
router.register('equipments', views.EquipmentViewSet)
router.register('special-equipments', views.SpecialEquipmentViewSet)
router.register('reservations', views.ReservationViewSet)
router.register('userinfo', views.UserInfoViewSet)
router.register('approval-applications', views.ApprovalApplicationViewSet)
router.register('usages', views.UsageViewSet)
router.register('ages', views.AgeViewSet)
router.register('usage-categorizes', views.UsageCategorizeViewSet)
router.register('age-categorizes', views.AgeCategorizeViewSet)
router.register('defferd-payments', views.DefferdPaymentViewSet)
router.register('facility-fees', views.FacilityFeeViewSet)
router.register('equipment-fees', views.EquipmentFeeViewSet)

approvals_router = nested_routers.NestedSimpleRouter(
    router,
    'approvals',
    lookup='approval'
)

places_router = nested_routers.NestedSimpleRouter(
    router,
    'places',
    lookup='place'
)

equipments_router = nested_routers.NestedSimpleRouter(
    router,
    'equipments',
    lookup='equipment'
)

special_equipmrnts_router = nested_routers.NestedSimpleRouter(
    router,
    'special-equipments',
    lookup='special_equipment'
)

reservations_router = nested_routers.NestedSimpleRouter(
    router,
    'reservations',
    lookup='reservation'
)

usages_router = nested_routers.NestedSimpleRouter(
    router,
    'usages',
    lookup='usage'
)

ages_router = nested_routers.NestedSimpleRouter(
    router,
    'ages',
    lookup='age'
)

# ----register----

approvals_router.register(
    'approval-applications',
    views.ApprovalApprovalApplicationViewSet,
    basename='approval-approval-applications'
)

places_router.register(
    'reservations',
    views.PlaceReservationViewSet,
    basename='place-reservations'
)

places_router.register(
    'facility-fee',
    views.PlaceFacilityFeeViewSet,
    basename='place-facilityfee'
)

equipments_router.register(
    'reservations',
    views.EquipmentReservationViewSet,
    basename='equipment-reservations'
)

equipments_router.register(
    'equipment-fees',
    views.EquipmentEquipmentFeeViewSet,
    basename='equipment-equipment-fees'
)

special_equipmrnts_router.register(
    'reservations',
    views.SpecialEquipmentReservationViewSet,
    basename='specialequipment-reservations'
)

reservations_router.register(
    'approval-applications',
    views.ReservationApprovalApplicationViewSet,
    basename='reservation-approval-applications'
)

reservations_router.register(
    'usage-categorizes',
    views.ReservationUsageCategorizeViewSet,
    basename='reservation-usage-categorizes'
)

reservations_router.register(
    'age-categorizes',
    views.ReservationAgeCategorizeViewSet,
    basename='reservation-age-categorizes'
)

reservations_router.register(
    'defferd-payments',
    views.ReservationDefferdPaymentViewSet,
    basename='reservation-defferd-payments'
)

usages_router.register(
    'usage-categorizes',
    views.UsageUsageCategorizeViewSet,
    basename='usage-usage-categorizes'
)

ages_router.register(
    'age-categorizes',
    views.AgeAgeCategorizeViewSet,
    basename='age-age-categorizes'
)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(approvals_router.urls)),
    path('', include(places_router.urls)),
    path('', include(equipments_router.urls)),
    path('', include(special_equipmrnts_router.urls)),
    path('', include(reservations_router.urls)),
    path('', include(usages_router.urls)),
    path('', include(ages_router.urls)),
    path('csv/export/', views.ApprovalApplicationCsvExportView.as_view(), name='csv_export'),
    path('reservation-lists/', views.ReservationDeleteView.as_view(), name='reservation-list'),
]
