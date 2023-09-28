from django.contrib import admin
from chatapp.models import ChatMessage

# Register your models here.


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_dispaly = '__all__'


