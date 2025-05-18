from rest_framework import permissions


class IsAdminUserRole(permissions.BasePermission):
    """
    Доступ разрешен только пользователям с ролью админа
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role == 'admin'


class IsManagerUserRole(permissions.BasePermission):
    """
    Доступ разрешен только пользователям с ролью менеджера
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role == 'manager'


class IsAdminOrManagerRole(permissions.BasePermission):
    """
    Доступ разрешен только пользователям с ролью админа или менеджера
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role in ['admin', 'manager']


class IsTicketOwner(permissions.BasePermission):
    """
    Доступ разрешен только автору тикета
    """
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user


class CanEditTicket(permissions.BasePermission):
    """
    Определяет права на редактирование тикета:
    - Обычные пользователи могут редактировать только свои тикеты, если статус 'open'
    - Менеджеры и админы могут редактировать любые тикеты и менять статус
    """
    def has_object_permission(self, request, view, obj):
        # Админы и менеджеры могут редактировать любые тикеты
        if request.user.role in ['admin', 'manager']:
            return True
            
        # Обычные пользователи могут редактировать только свои тикеты со статусом 'open'
        if obj.created_by == request.user and obj.status == 'open':
            return True
            
        return False
