from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Train, Airplane, TrainTicket, AirplaneTicket



admin.site.register(CustomUser)
admin.site.register(Train)
admin.site.register(Airplane)
admin.site.register(TrainTicket)
admin.site.register(AirplaneTicket)
