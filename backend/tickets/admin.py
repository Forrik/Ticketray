from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Ticket, Comment


class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin to display role field
    """
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('role',)}),
    )


class TicketAdmin(admin.ModelAdmin):
    """
    Admin configuration for Ticket model
    """
    list_display = ('title', 'status', 'created_by', 'assigned_to', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'


class CommentAdmin(admin.ModelAdmin):
    """
    Admin configuration for Comment model
    """
    list_display = ('author', 'ticket', 'created_at', 'content_preview')
    list_filter = ('created_at',)
    search_fields = ('content',)
    
    def content_preview(self, obj):
        """Возвращает первые 50 символов содержимого комментария"""
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    
    content_preview.short_description = 'Content Preview'


admin.site.register(User, CustomUserAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(Comment, CommentAdmin)
