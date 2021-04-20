#!/bin/sh

. ./.env

# reset MySQL
# mysql -uroot -e "drop database ${DB_NAME};"
# mysql -uroot -e "create database ${DB_NAME} default character set utf8;"

. Scripts/activate
python manage.py migrate
