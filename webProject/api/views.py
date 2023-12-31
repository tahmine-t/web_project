from django.shortcuts import render
from rest_framework.throttling import AnonRateThrottle
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser , TrainTicket, Train, Airplane, AirplaneTicket
from .serilizers import CustomUserSerializer , TrainTicketSerilizer, TrainSerilizer, AirplaneSerilizer, AirplaneTicketSerilizer
from rest_framework.permissions import IsAuthenticated, IsAdminUser , AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .authentication import CookieJWTAuthentication
from . function import is_valid_email

class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated , IsAdminUser]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    http_method_names = ['get', 'post', 'put', 'patch']
    # permission_classes = [IsAuthenticated]

class TrainTicketViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated , IsAdminUser]

    queryset = TrainTicket.objects.all()
    serializer_class = TrainTicketSerilizer

class TrainViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated , IsAdminUser]

    queryset = Train.objects.all()
    serializer_class = TrainSerilizer

class AirplaneViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated , IsAdminUser]

    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerilizer

class AirplaneTicketViewSet(ModelViewSet):
    queryset = AirplaneTicket.objects.all()
    serializer_class = AirplaneTicketSerilizer

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
            departure_date1 = request.query_params.get('departure_date')

            origin1 = request.query_params.get('origin')

            destination1 = request.query_params.get('destination')


            queryset = Airplane.objects.filter(destination=destination1, origin=origin1, departure_date=departure_date1)
            serializer = AirplaneSerilizer(queryset, many=True)
            
            if queryset:
                return Response(serializer.data)
            else:
                return Response({'error': 'no airplane found'})
        except:
            return Response({'error': 'invalid input'})

class ViewReserves(APIView):
    # permission_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]  
    def get(self , request):
        # print('=================================================================54554')
        user = request.user
        # user = CustomUser.objects.get(id = 1)
        TrainTicket_queryset = TrainTicket.objects.filter(user = user)
        AirplaneTicket_queryset = AirplaneTicket.objects.filter(user = user)
        TrainTicket_serializer = TrainTicketSerilizer(TrainTicket_queryset , many = True)
        AirplaneTicket_serializer = AirplaneTicketSerilizer(AirplaneTicket_queryset , many = True)
        return(Response({'TrainTicket': TrainTicket_serializer.data , 'AirplaneTicket': AirplaneTicket_serializer.data}))

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Get the access token from the response
        access_token = response.data.get('access')
        if access_token:
            # Set the access token as a secure HTTP-only cookie
            response.set_cookie('access_token', access_token, httponly=True, secure=True , max_age = 3600)
        return response

class Register(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    http_method_names = ['post']

class Logout(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    def get(self , request):
        response = Response({'success': 'logged out successfully'})
        response.delete_cookie('access_token')
        return(response)

class ChangeProfileView(APIView):
    # permission_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    # def put(self, request):
    #     user = request.user
    #     serializer = CustomUserSerializer(user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)

    def patch(self, request):
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class BuyTrainTicket(APIView):
    # permission_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    def post(self , request):
        data = request.data
        user = request.user
        data['user'] = user.id
        serializer = TrainTicketSerilizer(data = data)
        if serializer.is_valid():
            serializer.save(user = user)
            return(Response({'success': 'ticket bought successfully'}))
        else:
            errors = serializer.errors
            return Response(errors, status=400)

class BuyAirplaneTicket(APIView):
    # permission_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    def post(self , request):
        data = request.data
        user = request.user
        data['user'] = user.id
        serializer = AirplaneTicketSerilizer(data = data)
        if serializer.is_valid():
            serializer.save(user = user)
            return(Response({'success': 'ticket bought successfully'}))
        else:
            errors = serializer.errors
            return Response(errors, status=400)

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
