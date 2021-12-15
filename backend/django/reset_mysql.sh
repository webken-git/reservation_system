#!/bin/sh

. ./.env

# reset MySQL
mysql -uroot -e "drop database ${DATABASE_NAME};"
mysql -uroot -e "create database ${DATABASE_NAME} default character set utf8;"

. ../env/bin/activate
python manage.py migrate

# python csv_import.py
