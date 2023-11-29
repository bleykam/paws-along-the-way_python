from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chatapp/$', consumers.ChatRoomConsumer.as_asgi()),
    re_path(r'ws/account/$', consumers.MailboxConsumer.as_asgi())
]

# re_path(r'ws/account/(?P<user_name>\w+)/$', consumers.MailboxConsumer.as_asgi())