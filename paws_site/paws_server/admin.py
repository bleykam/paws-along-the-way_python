from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from paws_server.models import User, Animal, Organization, Profile, TransportRequest

# Register your models here.
admin.site.register(User, UserAdmin)

@admin.register(Animal, Organization, TransportRequest)
class AnimalAdmin(admin.ModelAdmin):
    list_dispaly = '__all__'


    


