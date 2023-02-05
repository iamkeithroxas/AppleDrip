from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import DeleteFollowerAPIView, DeleteFriendRequestAPIView, DeleteMessageAPIView, FetchFollowingAPIView, FetchMessageAPIView, FetchPostAPIView, FetchProfilePostAPIView, FetchUserFriendsOnlyAPIView, FetchUserFriendsRequestAPIView, FetchUserFriendsAPIView, FetchUserFriendsSentRequestAPIView, FetchUserGroups, FetchUserInfoAPIView, FollowerAPIView, UpdateFriendRequestAPIView, UpdateMessageAPIView, UpdateUserAPIView, UserMessageAPIView, UsersAPIView, DeleteGalleriesAPIView, DeleteMemberAPIView, FetchPostsAPIView, GroupDataAPIView, GroupDeleteAPIView, LogoutAPIView, PostDeleteAPIView, PostsAPIView, RefreshAPIView, RegisterAPIView, LoginApiView, UpdateGroupNameAPIView, UpdatePostAPIView, UserApiView, UserGalleriesAPIView, UserFriendsAPIView, CreateGroupAPIView, JoinGroupAPIView

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginApiView.as_view()),
    path('user', UserApiView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('users', UsersAPIView.as_view()),
    path('insert_post', PostsAPIView.as_view()),
    path('update_post/<int:pk>/', UpdatePostAPIView.as_view()),
    path('retrieve_user_post', FetchPostAPIView.as_view()),
    path('delete_post/<int:pk>/', PostDeleteAPIView.as_view()),
    path('fetch_post', FetchPostsAPIView.as_view()),
    path('my_gallery', UserGalleriesAPIView.as_view()),
    path('delete_gallery/<int:pk>/', DeleteGalleriesAPIView.as_view()),

    path('fetch_friends', FetchUserFriendsAPIView.as_view()),
    path('get_friends', FetchUserFriendsOnlyAPIView.as_view()),
    path('fetch_friend_request', FetchUserFriendsRequestAPIView.as_view()),
    path('fetch_sent_request', FetchUserFriendsSentRequestAPIView.as_view()),
    path('Addfriend', UserFriendsAPIView.as_view()),
    path('accept_request/<int:pk>/', UpdateFriendRequestAPIView.as_view()),
    path('delete_request/<int:pk>/', DeleteFriendRequestAPIView.as_view()),

    path('creategroup', CreateGroupAPIView.as_view()),
    path('joingroup', JoinGroupAPIView.as_view()),
    path('groups', GroupDataAPIView.as_view()),
     path('user_groups', FetchUserGroups.as_view()),
    path('updatename/<int:pk>/', UpdateGroupNameAPIView.as_view()),
    path('deletegroup/<int:pk>/', GroupDeleteAPIView.as_view()),
    path('deletemember/<int:pk>/', DeleteMemberAPIView.as_view()),

    path('message', UserMessageAPIView.as_view()),
    path('fetchmessage', FetchMessageAPIView.as_view()),
    path('updatemessage/<int:pk>/', UpdateMessageAPIView.as_view()),
    path('deletemessage/<int:pk>/', DeleteMessageAPIView.as_view()),
    path('follower', FollowerAPIView.as_view()),
    path('fetchfollower', FetchFollowingAPIView.as_view()),
    path('deletefollower/<int:pk>/', DeleteFollowerAPIView.as_view()),

    path('fetch_profile_post', FetchProfilePostAPIView.as_view()),
    path('update_profile/<int:pk>/', UpdateUserAPIView.as_view()),
    path('member', FetchUserInfoAPIView.as_view()),



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
