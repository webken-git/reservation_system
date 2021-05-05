from django.conf import settings
from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from reservations.views import views

app_name = 'reservations'

router = routers.DefaultRouter()
router.register('reservations', views.ReservationViewSet)
router.register('places', views.PlaceViewSet)
router.register('equipments', views.EquipmentViewSet)
router.register('special-equipments', views.SpecialEquipmentViewSet)
router.register('userinfo', views.UserInfoViewSet)
router.register('approval-applications', views.ApprovalApplicationViewSet)
router.register('usages', views.UsageViewSet)
router.register('ages', views.AgeViewSet)
router.register('usage-categorizes', views.UsageCategorizeViewSet)
router.register('age-categorizes', views.AgeCategorizeViewSet)
router.register('defferd-payments', views.DefferdPaymentViewSet)
router.register('facility-fees', views.FacilityFeeViewSet)
router.register('equipment-fees', views.EquipmentFeeViewSet)

reservations_router = nested_routers.NestedSimpleRouter(
    router,
    'reservations',
    lookup='reservations',
)

places_router = nested_routers.NestedSimpleRouter(
    router,
    'places',
    lookup='places',
)

places_router.register(
    'reservations',
    views.PlaceReservationViewSet,
    basename='place-reservations'
)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(reservations_router.urls)),
    path('', include(places_router.urls)),
]
