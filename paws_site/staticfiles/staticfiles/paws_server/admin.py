from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from paws_server.models import User, Animal, Organization, Profile, TransportRequest

# Register your models here.
admin.site.register(User, UserAdmin)

@admin.register(Animal, Organization, TransportRequest)
class AnimalAdmin(admin.ModelAdmin):
    list_dispaly = '__all__'



class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'organization')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'organization')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

admin.site.unregister(User)  # Unregister the default UserAdmin
admin.site.register(User, CustomUserAdmin) 
