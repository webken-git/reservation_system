#!/bin/sh

# �Хå����åץե��������¸����Ƥ���ǥ��쥯�ȥ�
dirpath='/home/webhok/db/backup/reservation'

# �ե�����̾�����(������ݡ��Ȥ������ե�����̾�˽񤭴����Ƥ�������)
filename='***'

# DB̾
db_name='webhok_reservation'

# DB�ѥ����
user_name='webhok'
password='lQ8Fmvx0PT1j'
host='mysql57.webhok.sakura.ne.jp'

# gz�ե���������
gzip -d $dirpath/$filename.sql.gz

# ����ݡ��Ȥ�¹�
mysql -u$user_name -p$password -h $host $db_name < $dirpath/$filename.sql