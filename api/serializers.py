# myapp/serializers.py
from rest_framework import serializers
from .models import Entry
from django.contrib.auth.models import User






class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class HelloSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=100)

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'title', 'content']