#!/bin/sh

cd $(dirname $0)
. ../../env/bin/activate

python ../backend/django/manage.py remind_email
