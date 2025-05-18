# Ticketray Backend

This is the backend portion of the Ticketray application built with Django and Django REST Framework.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Start development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

Documentation will be available at `/api/docs/` once the server is running.
