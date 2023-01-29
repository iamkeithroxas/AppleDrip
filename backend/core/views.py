from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from core.authentication import create_access_token, JWTAuthentication, create_refresh_token, decode_refresh_token
from rest_framework.authentication import get_authorization_header
from core.models import User, Posts, UserGallery, UserFriends
from .serializers import GroupSerializer, PostsSerializer, UserGalleriesSerializer, UserSerializer, UserFriendsSerializer, CreateGroupSerializer, JoinGroupSerializer, UserFollowersSerializer
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers
import json
from rest_framework import status
from django.db import connection
from collections import namedtuple
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import MessageSerializer
from rest_framework import permissions
from .models import GroupMembers, Groups, Message, UserFollowers


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException("Password not match")
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserApiView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class LoginApiView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise exceptions.AuthenticationFailed("Invalid credentials")
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed("Invalid credentials")
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token',
                            value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response


class RefreshAPIView(APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token,
        })


class LogoutAPIView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'success'
        }
        return response


class UsersAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Post to wall insert sample
class PostsAPIView(APIView):
    # def post(self, request):
    #     data = request.data
    #     if data['content'] == None:
    #         raise exceptions.APIException("Content is required.")
    #     serializer = PostsSerializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        data = request.data
        serializer = PostsSerializer(data=data)
        serializer1 = UserGalleriesSerializer(data=data)

        if serializer.is_valid() and serializer1.is_valid():
            serializer.save()
            serializer1.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class UpdatePostAPIView(APIView):

    def put(self, request, pk):
        post = Posts.objects.get(pk=pk)
        serializer = PostsSerializer(
            post, data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        non_field_errors = serializer.errors.get('non_field_errors', None)
        if non_field_errors:
            return Response({'non_field_errors': non_field_errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDeleteAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = Posts.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserGalleriesAPIView(APIView):
    def get(self, request):
        list_galleries = UserGallery.objects.all()
        serializer = UserGalleriesSerializer(list_galleries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteGalleriesAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = UserGallery.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except UserGallery.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


class FetchPostsAPIView(APIView):
    def get(self, request):
        # posts = Posts.objects.all()
        # posts = Posts.objects.raw('SELECT * FROM core_posts INNER JOIN core_user ON core_posts.user_id = core_user.id')
        # serializer = PostsSerializer(posts, many=True)
        # return JsonResponse(serializer.data, safe=False)
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT user_id,first_name,last_name,post_id,content,image,created_at FROM core_posts INNER JOIN core_user ON core_posts.user_id = core_user.id''')
        # row = cursor.fetchall()
        # print(row)
        return JsonResponse(dictfetchall(cursor), safe=False)


########################################## GROUP ####################################################

class CreateGroupAPIView(APIView): 
    def post(self, request):
        print(request.data)
        data = request.data
        serializer = CreateGroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST) 

class JoinGroupAPIView(APIView): 
    def post(self, request):
        print(request.data)
        data = request.data
        serializer = JoinGroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST) 

class UserFriendsAPIView(APIView): 
    def post(self, request):
        print(request.data)
        data = request.data
        serializer = UserFriendsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST) 

class GroupDataAPIView(APIView):
    def get(self, request):
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT group_id,group_name,created_at FROM core_groups''')
        return JsonResponse(dictfetchall(cursor), safe=False)

class UpdateGroupNameAPIView(APIView): 
    def put(self, request, pk):
        group = Groups.objects.get(pk=pk)
        serializer = GroupSerializer(group, data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        non_field_errors = serializer.errors.get('non_field_errors', None)
        if non_field_errors:
            return Response({'non_field_errors': non_field_errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupDeleteAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = Groups.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class DeleteMemberAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = GroupMembers.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND) 

# fetch friends api


class FetchUserFriendsAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['user_id'] == '':
            raise exceptions.APIException("User ID is required.")
        # friends = UserFriends.objects.filter(user_id=data['user_id'])
        # serializer = UserFriendsSerializer(friends, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT user_id,first_name,last_name,friend_id,status FROM core_userfriends INNER JOIN core_user ON core_userfriends.friend_id = core_user.id WHERE core_userfriends.user_id = %(select_cond)s''', params={'select_cond': data['user_id']})
        return JsonResponse(dictfetchall(cursor), safe=False)


class FetchUserFriendsRequestAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['user_id'] == '':
            raise exceptions.APIException("User ID is required.")
        # friends = UserFriends.objects.filter(user_id=data['user_id'])
        # serializer = UserFriendsSerializer(friends, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT user_id,first_name,last_name,friend_id,status FROM core_userfriends INNER JOIN core_user ON core_userfriends.user_id = core_user.id WHERE core_userfriends.friend_id = %(select_cond)s''', params={'select_cond': data['user_id']})
        return JsonResponse(dictfetchall(cursor), safe=False)


class GroupDataAPIView(APIView):
    def get(self, request):
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT group_id,group_name,created_at FROM core_groups''')
        return JsonResponse(dictfetchall(cursor), safe=False)

################################################################## message

class UserMessageAPIView(APIView): 
    def post(self, request):
        print(request.data)
        data = request.data
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST) 

class FetchMessageAPIView(APIView):
    def get(self, request):
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT message_id, sender_id, receiver_id,message, sent_at FROM core_message''')
        return JsonResponse(dictfetchall(cursor), safe=False)

class UpdateMessageAPIView(APIView): 
    def put(self, request, pk):
        message = Message.objects.get(pk=pk)
        serializer = GroupSerializer(message, data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        non_field_errors = serializer.errors.get('non_field_errors', None)
        if non_field_errors:
            return Response({'non_field_errors': non_field_errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteMessageAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = Message.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

####################################### Follower

class FollowerAPIView(APIView): 
    def post(self, request):
        print(request.data)
        data = request.data
        serializer = UserFollowersSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST) 

class FetchFollowingAPIView(APIView):
    def get(self, request):
        cursor = connection.cursor()
        cursor.execute(
            '''SELECT follow_id, user_id, follower_id FROM core_userfollowers''')
        return JsonResponse(dictfetchall(cursor), safe=False)

class DeleteFollowerAPIView(APIView):
    def delete(self, request, pk):
        try:
            instance = UserFollowers.objects.get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Posts.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)






# API TO CREATE

# NEIL
# DATABASE : core_posts
# FETCH POSTS DATA
# UPDATE POSTS DATA BY POST_ID
# DELETE POSTS DATA BY POST_ID

# DATABASE : core_user
# FETCH USER BY ID

# DATABASE : core_usergallery
# INSERT POST IMAGE . IF POST DATA HAS IMAGE THEN SAVE IT
# FETCH ALL IMAGE DATA
# DELETE IMAGE DATA BY POST_ID

# ///////////////////////////////
# VINCENT
# DATABASE : core_groups
# INSERT GROUP DATA
# FETCH ALL GROUPS DATA
# FETCH GROUP BY ID
# UPDATE GROUP NAME
# DELETE GROUP BY ID

# DATABASE : core_groupmember
# INSERT GROUP MEMBER TO GROUP
# DELETE MEMBER TO GROUP BY USER_ID AND GROUP ID

# ///////////////////////////////
# RONALD
# DATABASE : core_message
# INSERT MESSAGE DATA
# FETCH USER MESSAGE BY SENDER_ID AND RECEIVER_ID
# UPDATE MESSAGE CONTENT BY MESSAGE_ID
# DELETE MESSAGE BY MESSAGE_ID

# DATABASE : core_userfollowers
# INSERT FOLLOWER DATA
# FETCH ALL FOLLOWERS
# FETCH FOLLOWING BY USER_ID
# DELETE FOLLOWER DATA