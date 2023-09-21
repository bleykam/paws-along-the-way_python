import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.auth import login, get_user
from channels.db import database_sync_to_async

class ChatRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = await get_user(self.scope)
        await login(self.scope, user)
        await database_sync_to_async(self.scope["session"].save)()
        # self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        # self.room_group_name = "chat_%s" % self.room_name
        # # Join room group
        # await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
           
    async def disconnect(self, close_code): 
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, msg_words):
        print("msg_words", msg_words)
        msg_words_json = json.loads(msg_words)
        message = msg_words_json["message"]
        print(message, "meassage")
        user = await get_user(self.scope)
        username = user.username
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "chat_message",  'message': f'{username}: {message}'}
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
    
   