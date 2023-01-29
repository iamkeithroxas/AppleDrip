from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import FetchUserFriendsRequestAPIView, FetchUserFriendsAPIView, UsersAPIView, DeleteGalleriesAPIView, DeleteMemberAPIView, FetchPostsAPIView, GroupDataAPIView, GroupDeleteAPIView, LogoutAPIView, PostDeleteAPIView, PostsAPIView, RefreshAPIView, RegisterAPIView, LoginApiView, UpdateGroupNameAPIView, UpdatePostAPIView, UserApiView, UserGalleriesAPIView,UserFriendsAPIView,CreateGroupAPIView, JoinGroupAPIView, CreateMessageAPIView, FecthUserMessageAPIView, UpdateMessageContentAPIView, DeleteMessageAPIView, UserFollowersAPIView, FecthFollowersAPIView, FetchFollowingAPIView, DeleteFollowerAPIView

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginApiView.as_view()),
    path('user', UserApiView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('users', UsersAPIView.as_view()),
    path('insert_post', PostsAPIView.as_view()),
    path('update_post/<int:pk>/', UpdatePostAPIView.as_view()),
    path('delete_post/<int:pk>/', PostDeleteAPIView.as_view()),
    path('fetch_post', FetchPostsAPIView.as_view()),
    path('my_gallery', UserGalleriesAPIView.as_view()),
    path('delete_gallery/<int:pk>/', DeleteGalleriesAPIView.as_view()),

    path('fetch_friends', FetchUserFriendsAPIView.as_view()),
    path('fetch_friend_request', FetchUserFriendsRequestAPIView.as_view()),
    path('Addfriend', UserFriendsAPIView.as_view()),
    path('creategroup', CreateGroupAPIView.as_view()),
    path('joingroup', JoinGroupAPIView.as_view()),
    path('groups', GroupDataAPIView.as_view()),
    path('updatename/<int:pk>/', UpdateGroupNameAPIView.as_view()),
    path('deletegroup/<int:pk>/', GroupDeleteAPIView.as_view()),
    path('deletemember/<int:pk>/', DeleteMemberAPIView.as_view()),

    path('message/', CreateMessageAPIView.as_view()),
    path('fecth_message/', FecthUserMessageAPIView.as_view()),
    path('updatemessage/', UpdateMessageContentAPIView.as_view()),
    path('deletemessage/', DeleteMessageAPIView.as_view()),
    path('followers/', UserFollowersAPIView.as_view()),
    path('fecth_followers/', FecthFollowersAPIView.as_view()),
    path('fetch_following/', FetchFollowingAPIView.as_view()),
    path('deletefollower/', DeleteFollowerAPIView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
