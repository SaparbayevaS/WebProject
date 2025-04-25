from rest_framework import serializers
from .models import Genre, Movie, Favourite,  Profile
from django.contrib.auth import get_user_model

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password')

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class MovieSerializer(serializers.ModelSerializer):
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), source='genre', write_only=True
    )
    genre = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'genre', 'genre_id', 'image']


class MovieInProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title']  

class FavouriteSerializer(serializers.ModelSerializer):
    movie = MovieInProfileSerializer(read_only=True)

    class Meta:
        model = Favourite
        fields = ['id', 'movie']


class ProfileSerializer(serializers.ModelSerializer):
    favourite_movies = FavouriteSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'favourite_movies']



