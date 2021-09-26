from django.core.management.base import BaseCommand
import datetime
import pytz
import os
from dotenv import load_dotenv
from email.mime.text import MIMEText
from smtplib import SMTP
from reservations.models import ApprovalApplication

# BaseCommandを継承して作成


class Command(BaseCommand):
  # python manage.py help count_entryで表示されるメッセージ
  help = 'Display the number of approval articles'

  # コマンドライン引数を指定します。(argparseモジュール https://docs.python.org/2.7/library/argparse.html)
  # 今回はblog_idという名前で取得する。（引数は最低でも1個, int型）
  # def add_arguments(self, parser):
  #   parser.add_argument('approval_id', nargs='+', type=int)

  # コマンドが実行された際に呼ばれるメソッド
  def handle(self, *args, **options):
    now = datetime.datetime.now(pytz.timezone('Asia/Tokyo')) + datetime.timedelta(days=4)

    approval_data = ApprovalApplication.objects.filter(approval=2, reservation__start__year=now.strftime('%Y'), reservation__start__month=now.strftime('%m'), reservation__start__day=now.strftime('%d'))

    if approval_data:
      load_dotenv()

      s = SMTP(os.getenv('EMAIL_HOST'), os.getenv('EMAIL_PORT'))
      s.starttls()
      # s.ehlo()
      s.login(os.getenv('EMAIL_HOST_USER'), os.getenv('EMAIL_HOST_PASSWORD'))

      for data in approval_data:
        """件名"""
        subject = "ご予約の確認/稚内市みどりスポーツパーク"

        """本文"""
        message = data.reservation.contact_name + "　様<br><br>" + data.reservation.place.name + "のご予約ありがとうございました。<br><br>ご予約の【4日前】となりましたので、<br>念のためお知らせ申し上げます。<br><br>--------------------------<br>連絡者名： " + data.reservation.contact_name + "<br>電話番号： " + data.reservation.tel + "<br>日時： " + data.reservation.start.strftime('%Y年%#m月%d日 %H:%M') + " ～ " + data.reservation.end.strftime('%H:%M') + "<br>施設： " + data.reservation.place.name + "<br>--------------------------<br><br>当日は、" + data.reservation.contact_name + "様にお会いできますことを心よりお待ちしております。<br>どうぞお気をつけてお越しくださいませ。<br><br>みどりスポーツパーク"

        """送信元メールアドレス"""
        from_email = os.getenv('EMAIL_HOST_USER')

        """宛先メールアドレス"""
        to_email = data.reservation.user.email

        msg = MIMEText(message, "html")
        msg["Subject"] = subject
        msg["To"] = to_email
        msg["From"] = from_email

        # メール送信
        s.send_message(msg)

        self.stdout.write(self.style.SUCCESS('"%s' % to_email + '" 宛にメールを送信しました。'))
      s.quit()
    else:
      return "データがありませんでした。"
