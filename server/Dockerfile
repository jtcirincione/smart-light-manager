FROM python:3.11-slim

WORKDIR /app

copy requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

workdir /app/src

CMD ["flask", "run", "--host=0.0.0.0"]