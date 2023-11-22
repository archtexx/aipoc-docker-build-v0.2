FROM python:3.11-slim AS builder

WORKDIR .

RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  software-properties-common \
  git \
  && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1

RUN python -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt



COPY . .


EXPOSE 5000

CMD ["/opt/venv/bin/python", "app.py"]
