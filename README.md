# reservation_system

稚内市のスポーツ施設向けの予約システムです。

## 環境

Python 3.8.3

## usage

### local

以下のコマンドを実行してください。

```shell
1. cd reservation_system
2. git branch branchname (ex: kitaura, kinoshita)
3. git checkout branchname
4. git merge --allow-unrelated-histories origin/kitaura
5. cd backend & python -m venv .
6. Scripts\activate
7. pip install -r requirements.txt
8. cd config & python generate_secretkey_setting.py > local.py
11. cd ..\frontend & npm install
```

### use MySQL

XAMPPを利用する前提で設定方法を記載します。

```shell
1. XAMPPのコントロールパネルでMySQLを起動
2. cmdに戻る
3. cd reservation_system\backend
4. sh reset_mysql.sh
5. python manage.py runserver
```

### reset database

DBをリセットする際のコマンドです。

既にbackendディレクトリに移動している場合1. は飛ばして大丈夫です。

```shell
1. cd reservation_system\backend
2. sh reset_mysql.sh
```

## 初期データの追加

## user model

email:```websitecreatewak@gmail.com ```

pass: ```hogehoge```

```shell
python manage.py loaddata .\users\fixtures\data.json
```
