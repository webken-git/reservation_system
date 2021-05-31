#!/bin/sh

# 他のユーザからバックアップを読み込めないようにする
umask 077

# バックアップファイルを何日分残しておくか（一ヶ月分）
period=31
# バックアップファイルを保存するディレクトリ
dirpath='/root/backup/mysql/reservation'

# ファイル名を定義(※ファイル名で日付がわかるようにしておきます)
filename=`date +%y%m%d`

# DB名
db_name='reservation'

# DBパスワード
password='password'

# mysqldump実行（ファイルサイズ圧縮の為gzで圧縮しておきます。）
mysqldump --opt $db_name --default-character-set=binary -u root --password=$password | gzip > $dirpath/$filename.sql.gz
# mysqldump --opt --all-databases --events --default-character-set=binary -u root --password=パスワード | gzip > $dirpath/$filename.sql.gz

# 古いバックアップファイルを削除
oldfile=`date --date "$period days ago" +%y%m%d`
rm -f $dirpath/$oldfile.sql.gz
