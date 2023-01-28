from django.contrib import admin
from .models import Message, UserFollowers

admin.site.register(Message)
admin.site.register(UserFollowers)