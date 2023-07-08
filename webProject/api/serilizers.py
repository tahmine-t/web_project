from asyncore import write
from rest_framework import serializers
from .models import CustomUser,TrainTicket, Train, Airplane, AirplaneTicket

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'address', 'birthday', 'phone', 'is_staff', 'is_active', 'date_joined', 'role', 'password']
        read_only_fields = ('date_joined',)
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        return super().update(instance, validated_data)
    def partial_update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        return super().update(instance, validated_data)
class TrainTicketSerilizer(serializers.ModelSerializer):
    class Meta:
        model = TrainTicket
        fields = '__all__'
    # def create(self, validated_data):
    #     username = validated_data.pop('user')
    #     user = CustomUser.objects.get(email=username)
    #     validated_data['user'] = user
    #     trainid = validated_data.pop('train')
    #     train = Train.objects.get(id=trainid)
    #     validated_data['train'] = train
    #     return super().create(validated_data)
class TrainSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = '__all__'

class AirplaneSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Airplane
        fields = '__all__'
class AirplaneTicketSerilizer(serializers.ModelSerializer):
    class Meta:
        model = AirplaneTicket
        fields = '__all__'
    # def create(self, validated_data):
    #     username = validated_data.pop('user')
    #     user = CustomUser.objects.get(email=username)
    #     validated_data['user'] = user
    #     # airplaneid = validated_data.pop('airplane')
    #     # print(airplaneid , type(airplaneid))
    #     # print("AirplaneSerilizer(airplane)------------------------------------------------------------------------------------------------------------------------------------------------------------------------" + str(airplaneid))
    #     # airplane = Airplane.objects.get(id = airplaneid)
    #     # print("AirplaneSerilizer(airplane)------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

    #     # print(AirplaneSerilizer(airplane))
    #     # validated_data['airplane'] = airplane
    #     return super().create(validated_data)