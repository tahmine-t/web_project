from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import CustomUserManager

class Roles(models.IntegerChoices):
    buyer = 1, ('Buyer')
    seller = 2, ('Seller')
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(("email address"), unique=True)
    first_name = models.CharField(("first name"), max_length=30 , null= True , blank=True)
    last_name = models.CharField(("last name"), max_length=30 , null= True , blank=True)
    address = models.TextField(("address"), max_length=250 , null= True , blank=True)
    birthday = models.DateField("birthday", null = True, blank = True)
    phone = models.CharField(("phone"), max_length=11)
    is_staff = models.BooleanField(default=False, auto_created= True)
    is_active = models.BooleanField(default=True , auto_created= True)
    date_joined = models.DateTimeField(auto_created=True, default=timezone.now)
    role = models.IntegerField(choices=Roles.choices, default=Roles.buyer)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
from django.db import models

class Train(models.Model):
    id = models.IntegerField(primary_key=True)
    train_number = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    departure_station = models.CharField(max_length=100)
    arrival_station = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_date = models.DateField()
    arrival_time = models.TimeField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f"{self.id}"

class Airplane(models.Model):
    id = models.AutoField(primary_key=True)
    airline = models.CharField(max_length=100)
    flight_number = models.CharField(max_length=10)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_date = models.DateField()
    arrival_time = models.TimeField()
    available_seats = models.IntegerField()

    def __str__(self):
        return str(self.id)

class TrainTicket(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    passenger_FirstName = models.CharField(max_length=30)
    passenger_LastName = models.CharField(max_length=30)
    passenger_sex = models.CharField(max_length=10)
    passenger_email = models.EmailField()
    passenger_birthdate = models.DateField()
    passenger_ssid = models.CharField(max_length=10)
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"Train Ticket - {self.passenger_FirstName} ({self.origin} to {self.destination})"

class AirplaneTicket(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    airplane = models.ForeignKey(Airplane, on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    passenger_FirstName = models.CharField(max_length=30)
    passenger_LastName = models.CharField(max_length=30)
    passenger_sex = models.CharField(max_length=10)
    passenger_email = models.EmailField()
    passenger_birthdate = models.DateField()
    passenger_ssid = models.CharField(max_length=10)
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"Airplane Ticket - {self.passenger_FirstName} ({self.origin} to {self.destination})"