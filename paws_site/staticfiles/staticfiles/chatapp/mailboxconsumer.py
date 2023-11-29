# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class MailboxConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Retrieve the user associated with the WebSocket connection
        user = self.scope["user"]
        if user.is_authenticated:
            # Create a channel name for the user's mailbox
            mailbox_channel_name = f"user_{user.id}_mailbox"

            # Add the user to the channel group
            await self.channel_layer.group_add(
                mailbox_channel_name,
                self.channel_name
            )

            # Accept the WebSocket connection
            await self.accept()

    async def disconnect(self, close_code):
        # Handle WebSocket disconnect
        pass

    async def receive(self, text_data):
        # Handle incoming messages from the WebSocket
        pass
