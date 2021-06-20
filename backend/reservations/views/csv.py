from django.db.models import Q
from django.contrib import messages
from reservations.models import (
    ApprovalApplication
)
import datetime
import pytz
import csv
import glob
import os


class Csv:
  def __init__(self, request):
    # self.model = model
    self.request = request

  def export(self):
    queryset = ApprovalApplication.objects.order_by('id')
    data = queryset.filter(approval__name=self.request.data['approval__name'], reservation__delete_flag=0)

    now = datetime.datetime.now(pytz.timezone('Asia/Tokyo')).strftime('%Y%m%d-%H%M%S_')
    file_path = './static/reservations/csv/export/' + now + self.request.data['approval__name'] + 'リスト.csv'

    # 前回エクスポートしたCSVファイルを削除
    for path in glob.glob('./static/reservations/csv/export/' + '*' + self.request.data['approval__name'] + 'リスト.csv'):
      os.remove(path)

    with open(file_path, 'w', encoding='utf-8') as f:
      writer = csv.writer(f, quoting=csv.QUOTE_ALL)
      writer.writerow(['id', '団体名', '代表者名', '連絡者名', '住所', '電話番号', '団体予約か否か', '利用開始日時', '利用終了日時', '主催関係者数', '参集人員数', '利用目的', '入場料の徴収', '利用施設の名称', '附属設備・器具', '特別設備', '予約日', '予約状態'])
      for i in data:
        pk = i.id
        group_name = i.reservation.group_name
        reader_name = i.reservation.reader_name
        contact_name = i.reservation.contact_name
        address = i.reservation.address
        tel = i.reservation.tel
        is_group = i.reservation.is_group
        start = i.reservation.start
        end = i.reservation.end
        organizer_number = i.reservation.organizer_number
        participant_number = i.reservation.participant_number
        purpose = i.reservation.purpose
        admission_fee = i.reservation.admission_fee
        place = i.reservation.place.name
        equipment = i.reservation.equipment.name
        special_equipment = i.reservation.special_equipment.name
        created_at = i.reservation.created_at
        approval = i.approval.name

        writer.writerow([pk, group_name, reader_name, contact_name, address, tel, is_group, start, end, organizer_number, participant_number, purpose, admission_fee, place, equipment, special_equipment, created_at, approval])
    return '/backend/static/reservations/csv/export/' + now + self.request.data['approval__name'] + 'リスト.csv'


def csv_export(request):
  i = Csv(request)
  return i.export()