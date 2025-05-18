from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    """
    Custom user model with role field
    """
    ROLE_CHOICES = (
        ('user', 'User'),
        ('manager', 'Manager'),
        ('admin', 'Admin')
    )
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='user',
        null=False,
        blank=False
    )
    
    def __str__(self):
        return f"{self.username} ({self.role})"


class Ticket(models.Model):
    """
    Ticket model for tracking issues/requests
    """
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('closed', 'Closed')
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='open'
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_tickets'
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='assigned_tickets',
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.status}"


class Comment(models.Model):
    """
    Comment model for tickets
    """
    content = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    ticket = models.ForeignKey(
        Ticket,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Comment by {self.author.username} on {self.ticket.title}"

