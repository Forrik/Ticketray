# Ticketray

Полнофункциональное веб-приложение с разделенной архитектурой frontend/backend.

## Структура проекта

```
Ticketray/
├── backend/        # Django backend
│   ├── requirements.txt   # Python зависимости
│   └── README.md          # Инструкции по настройке бэкенда
│
└── frontend/       # React frontend
    ├── package.json       # JavaScript зависимости
    └── README.md          # Инструкции по настройке фронтенда
```

## Начало работы

1. Настройка бэкенда:
   - Создайте виртуальное окружение Python и активируйте его
   - Установите зависимости: `pip install -r backend/requirements.txt`
   - Создайте проект Django: `django-admin startproject ticketray_project .` (в директории backend)
   - Запустите миграции: `python manage.py migrate`
   - Запустите сервер: `python manage.py runserver`

2. Настройка фронтенда:
   - Установите зависимости: `npm install` (в директории frontend)
   - Запустите сервер разработки: `npm start`

## Технологии

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: JavaScript, React
- **База данных**: SQLite (разработка), PostgreSQL (продакшн)
"# Ticketray" 
"# Ticketray" 
"# Ticketray" 
"# Ticketray" 
