#!/bin/sh

# バックアップファイルを保存されているディレクトリ
dirpath='/home/webhok/db/backup/reservation'

# ファイル名を定義(※インポートしたいファイル名に書き換えてください)
filename='***'

# DB名
db_name='webhok_reservation'

# DBパスワード
user_name='webhok'
password='lQ8Fmvx0PT1j'
host='mysql57.webhok.sakura.ne.jp'

# gzファイルを解凍
gzip -d $dirpath/$filename.sql.gz

# インポートを実行
mysql -u$user_name -p$password -h $host $db_name < $dirpath/$filename.sql