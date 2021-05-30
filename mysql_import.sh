#!/bin/sh

# バックアップファイルを保存されているディレクトリ
dirpath='/root/backup/mysql/reservation'

# ファイル名を定義(※インポートしたいファイル名に書き換えてください)
filename='***'

# DB名
db_name='reservation'

# DBパスワード
password='password'

# gzファイルを解凍
gzip -d $dirpath/$filename.sql.gz

# インポートを実行
mysql -u root --password=$password $db_name < $dirpath/$filename.sql
