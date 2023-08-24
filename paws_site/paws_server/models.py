from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import uuid


class Organization(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.JSONField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    mission_statement = models.TextField(blank=True, null=True)
    social_media = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f" {self.name} - " \
               f" {self.mission_statement} "


class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    isDriver = models.BooleanField(default=False)


class Address(models.Model):
    address1 = models.CharField(max_length=100, blank=True, null=True)
    address2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    country = models.CharField(max_length=50)
    locationObj = models.JSONField(blank=True, null=True)


class Animal(models.Model):
    # SMALL (1-15 lbs), MEDIUM (16-40 lbs), LARGE (40-100 lbs), GIANT (101+ lbs)
    SIZE_CHOICES = [
        ('', ''),
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),
        ('Extra-Large', 'Giant'),
    ]

    GENDER_CHOICES = [
        ('', ''),
        ('Female', 'Female'),
        ('Male', 'Male'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=50)
    species = models.CharField(max_length=50)
    breeds = models.CharField(max_length=200, blank=True, null=True)
    colors = models.CharField(max_length=200, blank=True, null=True)
    age = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=25, choices=GENDER_CHOICES, default='', )
    size = models.CharField(max_length=25, choices=SIZE_CHOICES, default='', )
    coat = models.CharField(max_length=200, blank=True, null=True)
    attributes = models.JSONField(blank=True, null=True)
    environment = models.JSONField(blank=True, null=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    photos = models.URLField(blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f" {self.name} - " \
               f" {self.type} "


class Photo(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)

class SocialMedia(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    pinterest = models.URLField(blank=True, null=True)

class Hours(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, blank=True, null=True)
    monday = models.CharField(max_length=100, blank=True, null=True)
    tuesday = models.CharField(max_length=100, blank=True, null=True)
    wednesday = models.CharField(max_length=100, blank=True, null=True)
    thursday = models.CharField(max_length=100, blank=True, null=True)
    friday = models.CharField(max_length=100, blank=True, null=True)
    saturday = models.CharField(max_length=100, blank=True, null=True)
    sunday = models.CharField(max_length=100, blank=True, null=True)


class TransportRequest(models.Model):
    TIME_CHOICES = [
        ('', ''),
        ('MORNING', 'MORNING'),
        ('AFTERNOON', 'AFTERNOON'),
        ('EVENING', 'EVENING'),
        ('FLEXIBLE', 'FLEXIBLE'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, blank=True, null=True)
    origin_address = models.JSONField(blank=True, null=True)
    destination_address = models.JSONField(blank=True, null=True)
    date = models.DateField(blank=False, null=True)
    created_date = models.DateField(auto_now=True, blank=False, null=False)
    time = models.CharField(max_length=25, choices=TIME_CHOICES, default='')


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trans_request = models.ForeignKey(TransportRequest, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} Profile' \
               f" {self.user.organization} "


class Attributes(models.Model):
    spayed_neutered = models.BooleanField(default=False, null=True)
    house_trained = models.BooleanField(default=False, null=True)
    declawed = models.BooleanField(default=False, null=True)
    special_needs = models.BooleanField(default=False, null=True)
    shots_current = models.BooleanField(default=False, null=True)
    mixed = models.BooleanField(default=False, null=True)


class Environment(models.Model):
    children = models.BooleanField(default=False, null=True)
    dogs = models.BooleanField(default=False, null=True)
    cats = models.BooleanField(default=False, null=True)
