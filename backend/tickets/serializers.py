from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ticket, Comment

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор для пользователей"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']
        read_only_fields = ['id']


class RegisterSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователей"""
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {
            'role': {'default': 'user'}
        }
    
    def create(self, validated_data):
        """
        Создаем нового пользователя с зашифрованным паролем
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'user')
        )
        return user


class CommentSerializer(serializers.ModelSerializer):
    """Сериализатор для комментариев"""
    author = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']


class TicketSerializer(serializers.ModelSerializer):
    """Сериализатор для создания и отображения списка тикетов"""
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    
    class Meta:
        model = Ticket
        fields = [
            'id', 'title', 'description', 'status',
            'created_by', 'assigned_to', 'assigned_to_username',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at', 'assigned_to_username']
    
    def create(self, validated_data):
        """
        Создаем тикет и устанавливаем текущего пользователя как автора
        """
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


class TicketDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для детального отображения тикета с комментариями"""
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Ticket
        fields = [
            'id', 'title', 'description', 'status',
            'created_by', 'assigned_to', 'assigned_to_username',
            'created_at', 'updated_at', 'comments'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at', 'comments', 'assigned_to_username']
