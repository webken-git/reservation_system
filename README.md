# reservation_system

稚内市のスポーツ施設向けの予約システムです。

## Usage

### Create `backend/django/.env`

```
cp backend\django\.env.example backend\django\.env
```

### migration for database

```
$ docker-compose run --rm django sh -c "python manage.py makemigrations"

$ docker-compose run --rm django sh -c "python manage.py migrate"
```

### create superuser

```
docker-compose run --rm django sh -c "python manage.py createsuperuser"
```

### run server

```
docker-compose up --build

django:
http://127.0.0.1:8080/
mailhog:
http://127.0.0.1:8025/
```
