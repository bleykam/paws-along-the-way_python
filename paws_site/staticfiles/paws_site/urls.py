"""
URL configuration for paws_pages project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from paws_server import views
from paws_server.views import AnimalViewSet, OrganizationViewSet, TranportRequestViewSet, UserViewSet, indexView, logout_view, login_view, googleLogin, AnimalOrgList
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from chatapp import routing
from chatapp.views import ChatMessageViewSet
from django.conf import settings
from django.conf.urls.static import static, serve
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.views import LogoutView, LoginView
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users',UserViewSet,basename="user")
router.register(r'animals', AnimalViewSet,  basename='animal')
router.register(r'organizations', OrganizationViewSet)
router.register(r'tranportrequest', TranportRequestViewSet)
router.register(r'chatmessage', ChatMessageViewSet)


 
urlpatterns = [
    path('', indexView, name='index'),  
    path('chatapp/', include(routing.websocket_urlpatterns)),
    path('chatapp/', include("chatapp.urls")),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/org-animals/', AnimalOrgList.as_view(), name='org-animals'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  

    path('api-auth/', include("rest_framework.urls")),
    path('googleLogin/', googleLogin, name='google-login'),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name='logout' ),
     
    
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])