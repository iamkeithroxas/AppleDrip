from rest_framework.serializers import ModelSerializer
from .models import User, Posts, UserGallery
from django.db import models
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Message


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PostsSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = ['post_id','user_id', 'content', 'image']
        
class UserGalleriesSerializer(ModelSerializer):
    class Meta:
        model = UserGallery
        fields = ['gallery_id','user_id', 'image']


#message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data ['message']
        username = data ['username']
        room = data ['room']

        await self.save_message(username, room, message)

        await self.channel_layer.group_discard(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            }
        )
    async def chat_message(self, event):
        message = event ['message']
        username = event ['message']
    
    def save_message(self, username, room, message):
        Message.objects.create(username=username, room=room, context=message)
class Friend(models.Model):
    pass