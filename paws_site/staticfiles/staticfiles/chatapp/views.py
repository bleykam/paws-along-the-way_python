from django.shortcuts import render
from .models import ChatMessage
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from .serializers import ChatMessageSerializer
from django.contrib.auth.middleware import get_user

def index(request):
    print("GUR",get_user(request))
    print(request.session.items())
    print(request.user)
  
    context=request.session.items()
    scoped=request.scope
    user = request.user
    return render(request, "chatapp/index.html", {'context':context, "scoped":scoped, "user":user, "request":request.headers})

def chat(request, chat_name):
    print(request.session.items())
    print(request.user)
    print(request.auth)
    return render(request, 'chatapp/room.html', {'chat_name': chat_name})

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

