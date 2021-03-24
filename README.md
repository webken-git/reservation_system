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
5. cd backend
6. python -m venv .
7. Scripts\activate
8. pip install -r requirements.txt
9. cd ..\frontend
10. npm install
```

### use MySQL

XAMPPを利用する前提で設定方法を記載します。

```shell
1. XAMPPのコントロールパネルでShellを起動
2. mysql -u root
3. create database reservation_system default character set utf8;
4. cmdに戻る
5. cd reservation_system\backend
6. Scripts\activate
7. python manage.py makemigrations
8. python manage.py migrate
```
