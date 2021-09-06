import csv
import mysql.connector
import datetime
import pytz
import os
from dotenv import load_dotenv  # 追加


load_dotenv()  # 追加


# MySQLへの接続
connect = mysql.connector.connect(
    db=os.environ.get('DATABASE_NAME'),
    user=os.environ.get('DATABASE_USER'),
    passwd=os.environ.get('DATABASE_PASSWORD'),
    host=os.environ.get('DATABASE_HOST'),
    charset='utf8'
)
cursor = connect.cursor()


def insert_master_data(file, table):
  """
  マスターデータ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  for row in reader:
    sql = "INSERT INTO " + table + "(name, created_at, updated_at) VALUES(%s,%s,%s)"
    cursor.execute(sql, (row[0], now, now))
  f.close()


def intermediate_table(file, table, id1, id2):
  """
  中間テーブル
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(" + id1 + ", " + id2 + ") VALUES(%s,%s)"
    cursor.execute(sql, (row[0], row[1]))
  f.close()


def insert_facility_fee_data(file):
  """
  施設料金データ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table = 'reservations_facilityfee'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(place_id, age_id, is_group, purpose, fee, created_at, updated_at) VALUES(%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], row[2], row[3], row[4], now, now))
  f.close()


def insert_equipment_fee_data(file):
  """
  設備料金データ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table = 'reservations_equipmentfee'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(equipment_id, fee, created_at, updated_at) VALUES(%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], now, now))
  f.close()


def insert_reservation_data(file):
  """
  予約データ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table1 = 'reservations_reservation'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table1 + "(group_name, reader_name, contact_name, address, tel, is_group, delete_flag, start, end, organizer_number, participant_number, purpose, admission_fee, place_id, user_id, created_at, updated_at) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], now, now))
  f.close()


def insert_approval_application_data(file):
  """
  予約の承認状況データ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table = 'reservations_approvalapplication'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(approval_id, reservation_id, created_at, updated_at) VALUES(%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], now, now))
  f.close()


def insert_categorize_data(file, table):
  """
  利用区分及び年齢区分データ
  """
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(reservation_id, created_at, updated_at) VALUES(%s,%s,%s)"
    cursor.execute(sql, (row[0], now, now))
  f.close()


def insert_document_data(file, table):
  """
  申請書マスタ
  """
  f = open('./static/application_documents/csv/' + file, 'r', encoding='utf8')

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(name, url, created_at, updated_at) VALUES(%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], now, now))
  f.close()


insert_master_data('age.csv', "reservations_age")
insert_master_data('approval.csv', 'reservations_approval')
insert_master_data('place.csv', 'reservations_place')
insert_master_data('usage.csv', 'reservations_usage')
insert_master_data('equipment.csv', 'reservations_equipment')
insert_master_data('special_equipment.csv', 'reservations_specialequipment')
connect.commit()

intermediate_table('equipment_place.csv', 'reservations_equipment_place', 'equipment_id', 'place_id')
connect.commit()

insert_facility_fee_data('facility_fee.csv')
insert_equipment_fee_data('equipment_fee.csv')
insert_reservation_data('reservation.csv')
connect.commit()
insert_approval_application_data('approval-application.csv')
insert_categorize_data('usage-categorize.csv', 'reservations_usagecategorize')
insert_categorize_data('age-categorize.csv', 'reservations_agecategorize')
connect.commit()
intermediate_table('usage-categorize_usage.csv', 'reservations_usagecategorize_usage', 'usagecategorize_id', 'usage_id')
intermediate_table('age-categorize_age.csv', 'reservations_agecategorize_age', 'agecategorize_id', 'age_id')
insert_document_data('document.csv', 'application_documents_document')
connect.commit()
cursor.close()
connect.close()
