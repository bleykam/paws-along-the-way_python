import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.auth import login, get_user
from channels.db import database_sync_to_async
from chatapp.models import ChatMessage
from django.conf import settings
import pdb

class ChatRoomConsumer(AsyncJsonWebsocketConsumer):

    @database_sync_to_async   
    def save_message(self, message):
        message = ChatMessage.objects.create(sender=self.user, message=message)
        return message

    async def connect(self):
        self.user = await get_user(self.scope)
        
        self.user_name= self.user.username
        print("USER", self.user)
        print(self.scope['session'])
        self.scope["session"]['chat_name'] = 'capp'
        self.chat_name = 'zilly'

        await database_sync_to_async(self.scope["session"].save)()
    
        self.room_group_name = "chat_%s" % self.chat_name
        # # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        self.rooms = set()
   
    async def disconnect(self, close_code): 
        # Leave room group
        
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
   
    
    
            


class MailboxConsumer(AsyncJsonWebsocketConsumer):
    def save_message(self, message):
        message = ChatMessage.objects.create(sender=self.user, message=message)
        return message
    
    async def connect(self):
       
        # Retrieve the user associated with the WebSocket connection
        print("connect")
        self.user = await get_user(self.scope)
        
        print("user",self.scope)
        
        login(self.scope, self.user, settings.AUTHENTICATION_BACKENDS)
        
        self.chat_name = 'TBD'

        await database_sync_to_async(self.scope["session"].save)()
        print(self.scope["session"])
        print("user",self.user)
        if self.user.is_authenticated:
            print("user auth")
            # Create a channel name for the user's mailbox
            mailbox_channel_name = f"user_{self.user.username}_mailbox"

            # Add the user to the channel group
            await self.channel_layer.group_add(
                mailbox_channel_name,
                self.channel_name
            )

            # Accept the WebSocket connection
            await self.accept()

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
        
    async def disconnect(self, close_code): 
        # Leave room group
        print("disconnect")
        # await self.channel_layer.group_discard(self.room_group_name, self.channel_name)   