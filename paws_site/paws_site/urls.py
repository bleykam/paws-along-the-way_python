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
from paws_server.views import AnimalViewSet, OrganizationViewSet, TranportRequestViewSet, UserViewSet, indexView, login_view, logout_view, googleLogin, AnimalOrgList
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users',UserViewSet,basename="user")
router.register(r'animals', AnimalViewSet,  basename='animal')
router.register(r'organizations', OrganizationViewSet)
router.register(r'tranportrequest', TranportRequestViewSet)


urlpatterns = [
    path('api/org-animals/', AnimalOrgList.as_view(), name='org-animals'),
    path('admin/', admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path('googleLogin/', googleLogin, name='google-login'),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name='logout' ),
    path('api/', include(router.urls)),
    path('', indexView, name='index'), 
    
]


