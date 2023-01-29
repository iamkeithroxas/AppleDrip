from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import DeleteFollowerAPIView, DeleteMessageAPIView, FetchFollowingAPIView, FetchMessageAPIView, FetchUserFriendsRequestAPIView, FetchUserFriendsAPIView, FollowerAPIView, UpdateMessageAPIView, UserMessageAPIView, UsersAPIView, DeleteGalleriesAPIView, DeleteMemberAPIView, FetchPostsAPIView, GroupDataAPIView, GroupDeleteAPIView, LogoutAPIView, PostDeleteAPIView, PostsAPIView, RefreshAPIView, RegisterAPIView, LoginApiView, UpdateGroupNameAPIView, UpdatePostAPIView, UserApiView, UserGalleriesAPIView,UserFriendsAPIView,CreateGroupAPIView, JoinGroupAPIView

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

    path('message', UserMessageAPIView.as_view()),
    path('fetchmessage', FetchMessageAPIView.as_view()),
    path('updatemessage', UpdateMessageAPIView.as_view()),
    path('deletemessage', DeleteMessageAPIView.as_view()),
    path('follower', FollowerAPIView.as_view()),
    path('fetchfollower', FetchFollowingAPIView.as_view()),
    path('deletefollower', DeleteFollowerAPIView.as_view()),



    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)