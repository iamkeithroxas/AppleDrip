from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import FetchPostsAPIView, LogoutAPIView, PostsAPIView, RefreshAPIView, RegisterAPIView, LoginApiView, UserApiView, UserGalleriesAPIView

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginApiView.as_view()),
    path('user', UserApiView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('insert_post', PostsAPIView.as_view()),
    path('fetch_post', FetchPostsAPIView.as_view()),
    path('my_gallery', UserGalleriesAPIView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

