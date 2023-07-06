from django.shortcuts import render
from rest_framework.throttling import AnonRateThrottle
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser , TrainTicket, Train, Airplane, AirplaneTicket
from .serilizers import CustomUserSerializer , TrainTicketSerilizer, TrainSerilizer, AirplaneSerilizer, AirplaneTicketSerilizer
from rest_framework.permissions import IsAuthenticated

class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    http_method_names = ['get', 'post', 'put', 'patch']
    # permission_classes = [IsAuthenticated]
class TrainTicketViewSet(ModelViewSet):
    queryset = TrainTicket.objects.all()
    serializer_class = TrainTicketSerilizer

class TrainViewSet(ModelViewSet):
    queryset = Train.objects.all()
    serializer_class = TrainSerilizer
class AirplaneViewSet(ModelViewSet):
    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerilizer
class AirplaneTicketViewSet(ModelViewSet):
    queryset = AirplaneTicket.objects.all()
    serializer_class = AirplaneTicketSerilizer
# class GetTrain(APIView):

#     @ratelimit(key='ip', rate='5/hour', block=True)
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)
#     def get(self , request):
#         data = request.data
#         try:
#             queryset = Train.objects.filter(departure_station = data['departure_station'] , arrival_station = data['arrival_station'], departure_date = data['departure_date'])
#             serializer_class = TrainSerilizer
#             if queryset:
#                 return(Response(serializer_class(queryset , many = True).data))
#             else:
#                 return(Response({'error': 'no train found'}))
#         except:
#             return(Response({'error': 'invalid input'}))

class GetTrain(APIView):
    throttle_classes = [AnonRateThrottle]

    def get(self, request):
        try:
            departure_station = request.query_params.get('departure_station')
            arrival_station = request.query_params.get('arrival_station')
            departure_date = request.query_params.get('departure_date')

            queryset = Train.objects.filter(departure_station=departure_station, arrival_station=arrival_station, departure_date=departure_date)
            serializer = TrainSerilizer(queryset, many=True)
            
            if queryset:
                return Response(serializer.data)
            else:
                return Response({'error': 'no train found'})
        except:
            return Response({'error': 'invalid input'})
class GetAirplane(APIView):
    throttle_classes = [AnonRateThrottle]

    def get(self, request):
        try:
            departure_station = request.query_params.get('departure_station')
            arrival_station = request.query_params.get('arrival_station')
            departure_date = request.query_params.get('departure_date')

            queryset = Airplane.objects.filter(departure_station=departure_station, arrival_station=arrival_station, departure_date=departure_date)
            serializer = AirplaneSerilizer(queryset, many=True)
            
            if queryset:
                return Response(serializer.data)
            else:
                return Response({'error': 'no airplane found'})
        except:
            return Response({'error': 'invalid input'})