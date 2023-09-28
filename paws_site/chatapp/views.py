from django.shortcuts import render
from .models import ChatMessage
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from .serializers import ChatMessageSerializer


def index(request):
    return render(request, "chatapp/index.html")

def chat(request, chat_name):
    return render(request, 'chatapp/room.html', {'chat_name': chat_name})

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

