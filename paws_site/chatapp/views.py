from django.shortcuts import render, resolve_url
from django.contrib.sessions.models import Session
from django.contrib.auth.views import LoginView
from channels.auth import login, get_user

class CustomLoginView(LoginView):
   
    template_name = 'registration/login.html' 

    def get_success_url(self):
        return resolve_url('/chatapp/')

def index(request):
    user = request.user
    login(request.scope, user, backend='django.contrib.auth.backends.ModelBackend')
    return render(request, "chatapp/index.html")

def chat_box(request, chat_box_name):
    user = request.user
    print(user)
    # we will get the chatbox name from the url
    return render(request, "chatbox.html", {"chat_box_name": chat_box_name})


def room(request, room_name):
    return render(request, 'chatapp/room.html', {'room_name': room_name})

 
