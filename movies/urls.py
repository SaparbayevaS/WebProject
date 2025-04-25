from django.urls import path
from .views import login_view, register_view, MovieListView, FavouriteListView, UserListView, profile_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('favourites/', FavouriteListView.as_view(), name='favourite-list'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('profile/', profile_view, name='profile'),

]
