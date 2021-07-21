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

    load_dotenv()

    s = SMTP(os.getenv('EMAIL_HOST'), 1025)
    s.starttls()
    # s.ehlo()
    s.login(os.getenv('EMAIL_HOST_USER'), os.getenv('EMAIL_HOST_PASSWORD'))

    for data in approval_data:
      """件名"""
      subject = "リマインドメール：予約された施設の利用日が近づいています"

      """本文"""
      message = data.reservation.contact_name + "　様<br><br>緑スポーツパークの古川です。<br><br>先日予約された「" + data.reservation.place.name + "（" + data.reservation.start.strftime('%Y年%#m月%d日 %H:%M:%S') + "）」の4日前となりました。<br><br>忘れずにお越しくださいますようお願い申し上げます。<br><br>お待ちしております。"

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
