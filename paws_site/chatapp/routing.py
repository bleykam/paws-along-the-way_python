from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chatapp/$', consumers.ChatRoomConsumer.as_asgi()),
    re_path(r'ws/chatapp/(?P<chat_name>\w+)/$', consumers.ChatRoomConsumer.as_asgi())
]