from django.urls import path
from api import views

app_name = 'api'

urlpatterns = [
    path('', views.root, name='root'),
    # path('search/', views.SearchResults.as_view(), name='results'),
    # path('general/', views.GeneralGarbageList.as_view(), name='discharge_general'),
    # path('kitchen/', views.KitchenGarbageList.as_view(), name='discharge_kitchen'),
    # path('recyclables/', views.RecyclablesList.as_view(), name='discharge_recyclables'),
    # path('garbageday/', views.GarbageDayList.as_view(), name='garbageday'),
    # path('week/', views.WeekList.as_view(), name='week'),
    # path('weather/daily', views.daily_weather, name='daily'),
    # path('weather/3hour', views.hour_weather, name='3hour'),
    # path('session/save/', views.sessionSave, name='save'),
    # path('session/get/', views.SessionGet.as_view(), name='get'),
    # path('genetal/total/', views.total_general, name='total_general'),
    # path('kitchen/total/', views.total_kitchen, name='total_kitchen'),
]
