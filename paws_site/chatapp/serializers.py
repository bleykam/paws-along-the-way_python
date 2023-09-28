# serializers.py
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from paws_server.serializers import UserSerializer
from paws_server.models import User
from .models import ChatMessage
from rest_framework.views import APIView

class ChatMessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    print(sender)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'message', 'timestamp']


 