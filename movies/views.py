from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .models import Movie, Favourite, Profile
from .serializers import (
    LoginSerializer, RegisterSerializer,
    MovieSerializer, FavouriteSerializer,
    ProfileSerializer
)

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = get_user_model().objects.get(username=serializer.validated_data['username'])
        if user.check_password(serializer.validated_data['password']):
            refresh = RefreshToken.for_user(user)
            return Response({"access": str(refresh.access_token)}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        'name': user.username,
        'registrationDate': user.date_joined.strftime('%Y-%m-%d')
    })
    

class MovieListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class FavouriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favourites = Favourite.objects.filter(user=request.user)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    def post(self, request):
        movie_id = request.data.get('movie_id')
        try:
            movie = Movie.objects.get(id=movie_id)
            Favourite.objects.get_or_create(user=request.user, movie=movie)
            return Response({"message": "Movie added to favourites"}, status=status.HTTP_201_CREATED)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        

class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = get_user_model().objects.all()
        user_list = [{"username": user.username} for user in users]
        return Response(user_list, status=status.HTTP_200_OK)