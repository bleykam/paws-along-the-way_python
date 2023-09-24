# serializers.py
from rest_framework import serializers
from .models import ChatMessage
from rest_framework.views import APIView

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
        

