# 緑スポーツパーク予約システム　管理アプリ　操作手順書

## 目次

- ログインをする <span style="float:right;">1 - 2</span>
- ログアウトをする <span style="float:right;">3</span>
- 承認済みの予約を確認する <span style="float:right;">4</span>
- 未承認の予約を確認する <span style="float:right;">5</span>
- 不承認の予約を確認する <span style="float:right;">6</span>
- キャンセルされた予約を確認する <span style="float:right;">7</span>
- 予約システム利用者を確認する <span style="float:right;">8</span>
- カレンダーを確認する <span style="float:right;">9 - 10</span>
- データベースのバックアップ <span style="float:right;">11</span>
- 今後実装予定の機能について <span style="float:right;">12</span>

## ログインをする
**1. 管理アプリにアクセスする**

→「ログイン画面」が表示されます。

<img src="../../../../../../../manual/admin/row/login.png" width="500" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

**2. メールアドレスとパスワードを入力し、[ログイン]をクリック**

→ログイン完了後Topページに遷移します。

Topページでは今日の予約を確認できます。

（※7月6日の予約データが追加されてないので何も表示されていません）

## ① <img src="../../../../../../../manual/admin/login.png" width="500" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/row/top.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## ログアウトをする

**ログイン中に右上のアイコンをクリック**

→ログアウトが完了しログイン画面へ戻ります。

## ① <img src="../../../../../../../manual/admin/logout.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/row/login.png" width="500" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## 承認済みの予約を確認する

**左のサイドバーにある[承認リスト]をクリック**

→承認済みの**予約日がまだ過ぎていないデータ**がリスト表示されます。

- [詳細]項目の[a]の部分をクリックすると、より詳細なデータを確認できます。

- 現在実装できてませんが、データを選択して[印刷]ボタンを押すと、
  申請書を**印刷またはダウンロード**できる様にする予定です。

## ① <img src="../../../../../../../manual/admin/approval-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/approval.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## 未承認の予約を確認する

**左のサイドバーにある[未承認リスト]をクリック**

→未承認の**予約日がまだ過ぎていないデータ**がリスト表示されます。

- [詳細]項目のデータをクリックすると[承認リスト]と同様、より詳細なデータを確認できます。

- [承認]または[不承認]ボタンを押すと、[承認リスト]または[不承認リスト]へデータが移動し、ユーザー宛に[承認]または[不承認]された旨のメールが送信されます。

## ① <img src="../../../../../../../manual/admin/unapproval-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/unapproval.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## 不承認の予約を確認する

**左のサイドバーにある[不承認リスト]をクリック**

→不承認の**予約日がまだ過ぎていないデータ**がリスト表示されます。

- ページ内の操作は[承認リスト]と同じです。

## ① <img src="../../../../../../../manual/admin/disapproval-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/disapproval.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## キャンセルされた予約を確認する

**左のサイドバーにある[キャンセルリスト]をクリック**

→予約キャンセルされた**予約日がまだ過ぎていないデータ**がリスト表示されます。

- [詳細]項目のデータをクリックすると[承認リスト]と同様、より詳細なデータを確認できます。
- [キャンセル]ボタンをクリックすると、ボタンの表示が[キャンセル済み]へ切り替わり、ユーザー宛にキャンセル手続きが完了した旨のメールが送信されます。

## ① <img src="../../../../../../../manual/admin/cancel-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/cancel.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## 予約システム利用者を確認する

**左のサイドバーにある[ユーザーリスト]をクリック**

→予約システム利用者のデータがリスト表示されます。

- 現在実装できてませんが、[詳細]項目のデータをクリックすると、ユーザーの過去の予約データの閲覧や書類の印刷またはダウンロードができます。

## ① <img src="../../../../../../../manual/admin/users-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/users.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## カレンダーを確認する

**左のサイドバーにある[カレンダー]をクリック**

→予約データがカレンダー形式で表示されます。

- [←][→]ボタンをクリックすると日付を操作できます。
- [月][週]ボタンをクリックすると日付の表示が切り替わります。
- 施設ごとの表示の切り替えについては今後実装します。

## ① <img src="../../../../../../../manual/admin/calender-link.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ② <img src="../../../../../../../manual/admin/calender.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

## ③ <img src="../../../../../../../manual/admin/calender_xd.png" width="" class="alignnone size-full" style="border: 2px #000 solid;">

<div style="page-break-before:always"></div>

## データベースのバックアップ

自動でデータベースをバックアップしてくれる機能です。
具体的には毎朝4時頃にデータベースをバックアップし、一度バックアップしたデータは1か月間保存します。
1か月間過ぎた古いバックアップデーターは、次回のバックアップ時に自動削除します。

バックアップから**復元**する際は、こちらのスクリプトを一部書き換えた後実行する必要があります。

<img src="../../../../../../../manual/admin/db-import.png" width="500" class="alignnone size-full" style="border: 2px #000 solid;">

　実行方法はコマンドプロンプト等で
```
sh mysql_import.sh
```
を実行すれば完了です。

少々面倒な方法となっているので、もう少し簡単な方法を検討中です。

<div style="page-break-before:always"></div>

## 今後実装予定の機能について

下記の機能は今後実装予定のものです。

- 予約リストのCSVファイルへの書き出し＆ダウンロード
- 各種書類の作成
  - 印刷まではアプリ上では行わず、ファイルのダウンロードまでとなるかもしれません。
- 予約データの一括削除
  - 期間を指定して一括削除する形となります。
  - 恐らく[履歴]ページを作成して、[履歴]ページ内で操作することになると思います。
- 管理アプリ上での予約機能
  - 基本操作は一般ユーザー側のアプリと同様です。
- カレンダー機能の拡張
  - 月・週表示の切り替えや、施設ごとに表示の切り替えなど。
- 各種予約リストのフィルター（フィルタリング）機能
  - 日付や施設などを指定してデータの絞り込みを行います。
- スーパーユーザーのみ使える機能について
  - 管理者権限をもつユーザーの作成・削除・パスワード変更機能などを検討中。
- 料金・施設データ等の追加・変更・削除機能
  - データを書き換えた場合、システム全体の表示も変更されるため注意が必要です。
