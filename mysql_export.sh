#!/bin/sh

# 他のユーザからバックアップを読み込めないようにする
umask 077

# バックアップファイルを何日分残しておくか（一ヶ月分）
period=31
# バックアップファイルを保存するディレクトリ
dirpath='/home/webhok/db/backup/reservation'

# ファイル名を定義(※ファイル名で日付がわかるようにしておきます)
filename=`date +%y%m%d`

# DB名
db_name='webhok_reservation'

user_name='webhok'
password='lQ8Fmvx0PT1j'
host='mysql57.webhok.sakura.ne.jp'

# mysqldump実行（ファイルサイズ圧縮の為gzで圧縮しておきます。）
mysqldump --opt --default-character-set=binary --no-tablespaces -u$user_name -p$password -h $host $db_name | gzip > $dirpath/$filename.sql.gz

# 古いバックアップファイルを削除
oldfile=`date --date "$period days ago" +%y%m%d`
rm $dirpath/$oldfile.sql.gz
