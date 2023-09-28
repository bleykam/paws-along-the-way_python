import json
from channels.generic.websocket import AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
from channels.auth import login, get_user
from channels.db import database_sync_to_async
from chatapp.models import ChatMessage
import uuid
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.auth.models import AnonymousUser

class ChatRoomConsumer(AsyncJsonWebsocketConsumer):

    @database_sync_to_async   
    def save_message(self, message):
        message = ChatMessage.objects.create(sender=self.user, message=message)
        return message

    async def connect(self):
        self.user = await get_user(self.scope)
        user = self.user
        self.user_name= user.username
        
        self.scope["session"]['chat_name'] = 'zilly'
        self.chat_name = 'zilly'

        await database_sync_to_async(self.scope["session"].save)()
    
        print("CN", self.chat_name)
        self.room_group_name = "chat_%s" % self.chat_name
        # # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        self.rooms = set()
   
    async def disconnect(self, close_code): 
        # Leave room group
        await(logout(scope))
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data) #turns recieved json into python object
        message = text_data_json["message"]
        await self.save_message(message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message",  'message': f'{self.user_name}: {message}'}
        )
    
    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
     
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
   
    
    
            
    
   