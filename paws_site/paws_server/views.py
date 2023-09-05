import json
import requests
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt

from .models import Animal, User, Organization, TransportRequest
from .serializers import UserSerializer, OrganizationSerializer, AnimalSerializer,TransportRequestSerializer
from django.shortcuts import render

from django.conf import settings
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import generate_tokens_for_user

from urllib.parse import urlencode


def indexView(request, *args, **kwargs):
    return render(request, 'index.html')

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', 'user_id': user.id, 'token': 'your_generated_token'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

class AnimalViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
   
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    
class UserViewSet(viewsets.ModelViewSet, ApiErrorsMixin):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class OrganizationViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    
class TranportRequestViewSet(viewsets.ModelViewSet, APIView):
    queryset = TransportRequest.objects.all()
    serializer_class = TransportRequestSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]


@csrf_exempt
def googleLogin(request):
    try:
        
        if request.method == 'POST':
            data = json.loads(request.body)
            print("DATA", data)
            credential = data.get('credential')
            client_id = data.get('clientId')
            idinfo = id_token.verify_oauth2_token(credential, requests.Request(), client_id)
            print("IDINFO",idinfo)
            userid = idinfo['sub']

    except jwt.ExpiredSignatureError:
            return HttpResponse("JWT token has expired.", status=400)

    except jwt.DecodeError:
            return HttpResponse("Invalid JWT token.", status=400)

    except Exception as e:
        # Handle any other exceptions
        print("Error:", str(e))
        return HttpResponse("An error occurred.", status=500)     
    try:
        user = User.objects.get(email=idinfo['email'])
        access_token, refresh_token = generate_tokens_for_user(user)

        # Store the tokens as HttpOnly secure cookies
        response = JsonResponse({
            'user': UserSerializer(user).data,
        })
        response.set_cookie('access_token', str(access_token), httponly=True, secure=True)
        response.set_cookie('refresh_token', str(refresh_token), httponly=True, secure=True)
        return response
    
    except User.DoesNotExist:
        username = idinfo['email'].split('@')[0]
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')

        user = User.objects.create(
            username=username,
            email=idinfo['email'],
            first_name=first_name,
            last_name=last_name,
            phone_no=None,
            referral=None
        )
        
        access_token, refresh_token = generate_tokens_for_user(user)
        response_data = {
            'user': UserSerializer(user).data,
            'access_token': str(access_token),
            'refresh_token': str(refresh_token)
        }
        print("response data", response_data)
        return JsonResponse(response_data)


     




