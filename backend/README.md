# Backend


## Usage

dockerを利用する方は以下を確認してください。

### Create `backend/django/.env`

```
$ cp backend\django\.env.example backend\django\.env
```

### migration for database

```
$ docker-compose run --rm django sh -c "python manage.py makemigrations"

$ docker-compose run --rm django sh -c "python manage.py migrate"
```

### create superuser

```
$ docker-compose run --rm django sh -c "python manage.py createsuperuser"
```

### run server

```
$ docker-compose up --build

django:
http://127.0.0.1:8000/
mailhog:
http://127.0.0.1:8025/
```
