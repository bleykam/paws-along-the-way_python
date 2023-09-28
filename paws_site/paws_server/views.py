import json
import requests
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests

from .models import Animal, User, Organization, TransportRequest
from .serializers import UserSerializer, OrganizationSerializer, AnimalSerializer,TransportRequestSerializer

from django.shortcuts import render, resolve_url

from django.conf import settings
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from django.contrib.auth import views as auth_views

from django.contrib.auth import login as auth_login
from django.contrib.sites.shortcuts import get_current_site
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import generate_tokens_for_user
from django.contrib.auth.views import RedirectURLMixin


def indexView(request, *args, **kwargs):
    return render(request, 'index.html')

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        token, created = Token.objects.get_or_create(user=user)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', 'user_id': user.id, 'token': token.key})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

class AnimalViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
   
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    
class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class OrganizationViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    
class TranportRequestViewSet(viewsets.ModelViewSet):
    queryset = TransportRequest.objects.all()
    serializer_class = TransportRequestSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]


@csrf_exempt
def googleLogin(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            credential = data.get('credential')
            client_id = data.get('clientId')
            idinfo = id_token.verify_oauth2_token(credential, requests.Request(), client_id)
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
       
        user = User.objects.create(
            username=idinfo['email'].split('@')[0],
            email=idinfo['email'],
            first_name=idinfo['given_name'],
            last_name=idinfo['family_name'],

        )
        
        access_token, refresh_token = generate_tokens_for_user(user)
        response_data = {
            'user': UserSerializer(user).data,
            'access_token': str(access_token),
            'refresh_token': str(refresh_token)
        }
        print("response data", response_data)
        return JsonResponse(response_data)


class AnimalOrgList(generics.ListAPIView):
    serializer_class = AnimalSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['organization']
    
    def get_queryset(self):
 
        """
        restricts the returned animals to a given organization,
        by filtering against a `organization_id` query parameter in the URL.
        """
        queryset = Animal.objects.all()
        org_id = self.request.query_params.get('orgId')
        if org_id is not None:
            queryset = queryset.filter(organization=org_id)
        return queryset
    
