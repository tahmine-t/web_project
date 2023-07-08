from django.urls import path, include
from rest_framework import routers

from .views import UserViewSet , TrainViewSet, TrainTicketViewSet,GetTrain, AirplaneViewSet,AirplaneTicketViewSet,GetAirplane,ViewReserves

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'trainticket', TrainTicketViewSet)
router.register(r'train', TrainViewSet)
router.register(r'airplane', AirplaneViewSet)
router.register(r'airplaneticket', AirplaneTicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('gettrain/', GetTrain.as_view(), name='gettrain'),
    path('getairplane/', GetAirplane.as_view(), name='getairplane'),
    path('viewreserves/', ViewReserves.as_view(), name='viewreserves'),


]