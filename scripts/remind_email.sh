#!/bin/sh

. ../backend/env/bin/activate

python ../backend/django/manage.py remind_email
