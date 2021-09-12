#!/bin/sh

cd $(dirname $0)
. ../backend/env/Scripts/activate

python ../backend/django/manage.py remind_email
