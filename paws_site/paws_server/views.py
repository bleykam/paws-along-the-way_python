from .models import Animal, User, Organization, Hours, Address, SocialMedia, TransportRequest, Profile
from .serializers import UserSerializer, OrganizationSerializer, AnimalSerializer, HoursSerializer, \
    TransportRequestSerializer, AddressSerializer, CreateUserSerializer
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth import logout, login, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
import json
from rest_framework import viewsets, status
from rest_framework.authentication import BasicAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

def indexView(request, *args, **kwargs):
    return render(request, 'index.html')


class AnimalViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
   
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    

class UserViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
     
class OrganizationViewSet(viewsets.ModelViewSet, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    
class AddressViewSet(viewsets.ModelViewSet, APIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

class HoursViewSet(viewsets.ModelViewSet, APIView):
    queryset = Hours.objects.all()
    serializer_class = HoursSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]


class SocialMediaViewSet(viewsets.ModelViewSet, APIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMedia
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]


class TranportRequestViewSet(viewsets.ModelViewSet, APIView):
    queryset = TransportRequest.objects.all()
    serializer_class = TransportRequestSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

   
@csrf_protect   
class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        # simply delete the token to force a login
        token, get = Token.objects.get_or_create(user=user)
        return Response(status=status.HTTP_200_OK)
    
 
class CustomAuthToken(ObtainAuthToken, APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
          
        })    
        


@ensure_csrf_cookie
@csrf_exempt
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