from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/chatapp/(?P<user_name>\w+)/$", consumers.ChatRoomConsumer.as_asgi()),
]