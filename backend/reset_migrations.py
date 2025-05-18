from django.db import connection

print("Resetting migration history...")

with connection.cursor() as cursor:
    # Проверяем, существует ли таблица django_migrations
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='django_migrations'")
    if cursor.fetchone():
        # Удаляем все записи о миграциях
        cursor.execute("DELETE FROM django_migrations")
        print("Migration history has been cleared.")
    else:
        print("Table django_migrations does not exist.")
