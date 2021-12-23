# コマンドまとめ

## ・Djangoサーバー起動方法

### Git bashの場合
```
1. mysql を起動
2. $ . backend/env/Scripts/activate && cd backend/django/
3. $ python manage.py runserver
```

### Linux・FreeBSD環境の場合（/bin/sh）

```
1. mysql を起動
2. $ . backend/env/bin/activate && cd backend/django/
3. $ python manage.py runserver
```

### cmd・PowerShellの場合
```
1. mysql を起動
2. $ backend\env\Scripts\activate && cd backend\django
3. $ python manage.py runserver
```

## ・Reactアプリの起動方法
```
1. バックエンドサーバーを起動
2. $ npm run start:test
```

## ・Reactアプリのビルド方法

### Windows環境の場合
```
$ npm run winBuild
```

### Linux・FreeBSD環境の場合
```
$ npm run build
```

## ・DBのリセット方法
```
1. $ sh reset_mysql.sh
2. Djangoサーバーを起動
3. 「http://localhost:8000/account/registration/」へ移動
4. emailとpasswordを入力しユーザー作成
5. Apache を起動し、phpmyadminにアクセス
6. 先程作成したユーザーのデータの「is_staff」を「1」に変更
7. Djangoサーバーを停止
8. $ python csv_import.py
```

## ・バックエンド側の初期設定

### python3.8系の場合
```
1. 「https://github.com/MicrosoftArchive/redis/releases」にアクセスし、Redisをインストール
2. $ cd backend
3. $ python -m venv env
4. $ env\Scripts\activate
5. $ python -m pip install -U pip
6. $ cd django
7. $ pip install -r requirements.txt
8. $ cp .env.example .env
9. .env を以下の通りに書き換える
--
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=''
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=websitecreatewak@gmail.com
EMAIL_HOST_PASSWORD=websitecreatewak@gmail.comのパスワード
--
10. mysql を起動
11. $ sh reset_mysql.sh
12. Djangoサーバーを起動
13. 「http://localhost:8000/account/registration/」へ移動しユーザー作成
14. Apache を起動後phpmyadminにアクセスし作成したユーザーの「is_staff」を「1」に変更
15. Djangoサーバーを停止
16. $ python csv_import.py
```

<div style="page-break-before:always"></div>

### python3.9系の場合
```
1. 「https://github.com/MicrosoftArchive/redis/releases」にアクセスし、Redisをインストール
2. $ cd backend
3. $ py -m venv env
4. $ env\Scripts\activate
5. $ py -m pip install -U pip
6. $ cd django
7. $ pip install -r requirements.txt
8. $ cp .env.example .env
9. .env を以下の通りに書き換える
--
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=''
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=websitecreatewak@gmail.com
EMAIL_HOST_PASSWORD=websitecreatewak@gmail.comのパスワード
--
10. mysql を起動
11. $ sh reset_mysql.sh
12. Djangoサーバーを起動
13. 「http://localhost:8000/account/registration/」へ移動しユーザー作成
14. Apache を起動後phpmyadminにアクセスし作成したユーザーの「is_staff」を「1」に変更
15. Djangoサーバーを停止
16. python csv_import.py
```

## Redisのキャッシュクリア方法
```
$ redis-cli
$ flushall
$ exit
```
