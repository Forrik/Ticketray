from rest_framework import generics, status, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Ticket, Comment
from .serializers import (
    UserSerializer, RegisterSerializer, TicketSerializer,
    TicketDetailSerializer, CommentSerializer
)
from .permissions import (
    IsAdminUserRole, IsManagerUserRole, IsAdminOrManagerRole,
    IsTicketOwner, CanEditTicket
)

User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    """
    API для регистрации новых пользователей
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserListAPIView(generics.ListAPIView):
    """
    API для получения списка всех пользователей
    Доступен только для администраторов
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'role']


class TicketListCreateAPIView(generics.ListCreateAPIView):
    """
    API для получения списка тикетов и создания новых
    
    GET:
    - user видит только свои тикеты
    - manager и admin видят все тикеты
    
    POST:
    - создает тикет с текущим пользователем как автором
    """
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'status']
    ordering_fields = ['created_at', 'updated_at', 'status']
    
    def get_queryset(self):
        # Фильтрация тикетов в зависимости от роли пользователя
        user = self.request.user
        if user.role in ['admin', 'manager']:
            return Ticket.objects.all()
        return Ticket.objects.filter(created_by=user)
    
    def perform_create(self, serializer):
        # Автоматически устанавливаем текущего пользователя как автора
        serializer.save(created_by=self.request.user)


class TicketRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    """
    API для получения детальной информации о тикете и его обновления
    
    GET:
    - доступен всем авторизованным пользователям
    
    PUT/PATCH:
    - user может редактировать только свой тикет и только если статус 'open'
    - manager и admin могут редактировать любые тикеты, менять статус и assigned_to
    """
    queryset = Ticket.objects.all()
    serializer_class = TicketDetailSerializer
    permission_classes = [IsAuthenticated, CanEditTicket]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return TicketSerializer
        return TicketDetailSerializer
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Ограничение полей для обычных пользователей
        if request.user.role == 'user':
            # Обычные пользователи могут редактировать только описание
            data = {}
            if 'description' in request.data:
                data['description'] = request.data['description']
            serializer = self.get_serializer(instance, data=data, partial=True)
        else:
            # Админы и менеджеры могут редактировать все поля
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)


class CommentCreateAPIView(generics.CreateAPIView):
    """
    API для создания комментариев к тикетам
    
    POST:
    - добавляет комментарий к указанному тикету
    - автор - текущий пользователь
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # Проверяем, есть ли ticket_id в URL-параметрах
        ticket_id = self.kwargs.get('ticket_id')
        
        # Если ticket_id нет в URL, получаем его из данных запроса
        if not ticket_id and 'ticket' in self.request.data:
            ticket_id = self.request.data.get('ticket')
        
        if not ticket_id:
            raise serializers.ValidationError({'ticket': 'Требуется указать ID тикета'})
            
        ticket = get_object_or_404(Ticket, id=ticket_id)
        
        # Сохраняем комментарий с автором и тикетом
        serializer.save(author=self.request.user, ticket=ticket)


# Базовые API для примера и тестирования
def hello_world(request):
    return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


def public_endpoint(request):
    return Response({"message": "This is a public endpoint"}, status=status.HTTP_200_OK)
