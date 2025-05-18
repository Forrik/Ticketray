from django.urls import path
from . import views
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # Документация API
    path('docs/', include_docs_urls(title='Ticketray API')),
    
    # Публичные эндпоинты
    path('hello/', views.hello_world, name='hello_world'),
    path('public/', views.public_endpoint, name='public_endpoint'),
    
    # Аутентификация и регистрация
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    
    # Тикеты
    path('tickets/', views.TicketListCreateAPIView.as_view(), name='ticket-list-create'),
    path('tickets/<int:pk>/', views.TicketRetrieveUpdateAPIView.as_view(), name='ticket-detail'),
    
    # Комментарии
    path('comments/', views.CommentCreateAPIView.as_view(), name='comment-create'),  # Добавлен общий маршрут для комментариев
    path('tickets/<int:ticket_id>/comments/', views.CommentCreateAPIView.as_view(), name='ticket-comments'),  # Оставляем и вложенный маршрут
    
    # Пользователи
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
]
