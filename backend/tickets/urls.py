from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('public/', views.public_endpoint, name='public_endpoint'),
]
