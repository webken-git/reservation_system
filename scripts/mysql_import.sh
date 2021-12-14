#!/bin/sh

# バックアップファイルを保存されているディレクトリ
dirpath='/root/backup/mysql/reservation'

# ファイル名を定義(※インポートしたいファイル名に書き換えてください)
filename='***'

# DB名
db_name='reservationSystem'

user_name='user'
password='password'
host='***'

# gzファイルを解凍
gzip -d $dirpath/$filename.sql.gz

# インポートを実行
mysql -u$user_name -p$password -h $host $db_name < $dirpath/$filename.sql
