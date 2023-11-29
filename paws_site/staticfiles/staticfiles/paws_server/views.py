import json
import requests
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests

from .models import Animal, User, Organization, TransportRequest
from .serializers import UserSerializer, OrganizationSerializer, AnimalSerializer,TransportRequestSerializer
from django.shortcuts import render

from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect


from django.contrib.auth import user_logged_in
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication

from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

from .utils import generate_tokens_for_user
from django.contrib.auth.views import RedirectURLMixin
from django.contrib.auth.views import LoginView
import django 
from django.utils.decorators import method_decorator
import pdb

 
def indexView(request, *args, **kwargs):
    
    return render(request, 'paws_server/index.html', {'request':request.user})

@csrf_exempt
def login_view(request):
    try:
        if request.method == 'POST':
   
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            print("RESPONSE:", HttpResponse.items(request))
    
    except jwt.ExpiredSignatureError:
        return HttpResponse("JWT token has expired.", status=400)

    except jwt.DecodeError:
        return HttpResponse("Invalid JWT token.", status=400)

    except Exception as e:
        # Handle any other exceptions
        print("Error:", str(e))
        return HttpResponse("An error occurred.", status=500)     
    
    try:
        user = authenticate(request, username=username, password=password)
        print("USSSERR", authenticate(request, username=username, password=password))
        
        if user is not None and user.is_authenticated :
                login(request, user)
                request.session.save()
                if user_logged_in:
                    print(request.user.backend)
                    request.session.user=user
                    request.session.save()
                print("RSU", request.session.user)
                print("RS", request.session.items())
        
                print("REQUEST", request.META)
           
                token, created = Token.objects.get_or_create(user=user)
                access_token, refresh_token = generate_tokens_for_user(user)
                
                print("COOKIE: ", access_token)
                response = JsonResponse({
                    'user': UserSerializer(user).data,
                    'token': token.key,
                    'user_id': user.id,
                    'session_key':request.session.session_key,
                    'cookie': request.META.get('CSRF_COOKIE')
                
                })
                response.set_cookie('access_token', str(access_token), )
                response.set_cookie('refresh_token', str(refresh_token))
                response.set_cookie('sessionid', request.session.session_key)
               
                print("RESHED", response.cookies)
                return response
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

    except User.DoesNotExist:
        pass
        
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
      
        return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})

    return JsonResponse({'status': 'error', 'message': 'Not logged out'})

class AnimalViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    http_method_names = ['get', 'put', 'head', 'post', 'options']
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer 
    
class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [BasicAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    print("PC", permission_classes)
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
    
