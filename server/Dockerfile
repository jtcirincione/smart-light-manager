FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /app/src

CMD ["python", "app.py"]
# CMD ["gunicorn", "-k", "eventlet", "-w", "1", "-b", "0.0.0.0:5000", "app:create_app()", "--access-logfile", "-", "--error-logfile", "-"]