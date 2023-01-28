from rest_framework.serializers import ModelSerializer
from .models import User, Posts, UserGallery, GroupMembers,UserFriends, Groups


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'date_joined']
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
        fields = ['user_id', 'content', 'image', 'created_at']

class UserGalleriesSerializer(ModelSerializer):
    class Meta:
        model = UserGallery
        fields = ['gallery_id','user_id', 'image']

class UserFriendsSerializer(ModelSerializer):
    class Meta:
        model = UserFriends
        fields = ['frnd_id','user_id','friend_id']

class CreateGroupSerializer(ModelSerializer):
    class Meta:
        model = Groups
        fields = ['group_id','group_name','created_at']

class JoinGroupSerializer(ModelSerializer):
    class Meta:
        model = GroupMembers
        fields = ['group_id','user_id','joined_at','gm_id']

class GroupSerializer(ModelSerializer):
    class Meta:
        model = Groups
        fields = ['group_id','group_name','created_at']