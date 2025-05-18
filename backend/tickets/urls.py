from django.urls import path
from . import views

urlpatterns = [
    # Публичные эндпоинты и регистрация
    path('hello/', views.hello_world, name='hello_world'),
    path('public/', views.public_endpoint, name='public_endpoint'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    
    # Тикеты
    path('tickets/', views.TicketListCreateAPIView.as_view(), name='ticket-list-create'),
    path('tickets/<int:pk>/', views.TicketRetrieveUpdateAPIView.as_view(), name='ticket-detail'),
    
    # Комментарии
    path('tickets/<int:ticket_id>/comments/', views.CommentCreateAPIView.as_view(), name='comment-create'),
    
    # Пользователи
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
]
