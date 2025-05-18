FROM python:3.11-slim

WORKDIR /app

# Установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода проекта
COPY . .

# Открываем порт
EXPOSE 8000

# Запуск сервера разработки
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
