#!/bin/sh

# git
git merge --allow-unrelated-histories origin/kitaura

# backend
cd backend
python -m venv .
. Scripts/activate
python -m pip install -U pip
pip install -r requirements.txt
cd config
python generate_secretkey_setting.py > local.py

# frontend
cd ../../frontend
npm install
