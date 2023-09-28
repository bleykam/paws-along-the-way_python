from django.shortcuts import render, resolve_url
from django.contrib.sessions.models import Session
from channels.auth import login, get_user
from .models import ChatMessage
from django.utils.decorators import method_decorator
from channels.layers import get_channel_layer
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from .serializers import ChatMessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic.edit import View
from django.http import  JsonResponse
from paws_server.models import User
from rest_framework.decorators import api_view




def index(request):
    context = request.body
    chat_name = request.session.get('chat_name')
    return render(request, "chatapp/index.html", {'context':context, "chat_name":chat_name})

def chat_box(request, chat_box_name):
    user = request.user
    print(user)
    # we will get the chatbox name from the urlfrom channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    print(channel_layer)
    return render(request, "chatbox.html", {"chat_box_name": chat_box_name})


def chat(request, chat_name):
    return render(request, 'chatapp/room.html', {'chat_name': chat_name})


 
class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

