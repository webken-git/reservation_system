import csv
import mysql.connector
import datetime
import pytz

# MySQLへの接続
connect = mysql.connector.connect(
    db='webhok_reservation',
    user='webhok',
    passwd='lQ8Fmvx0PT1j',
    host='mysql57.webhok.sakura.ne.jp',
    charset='utf8'
)
cursor = connect.cursor()


def master_data(file, table):
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  for row in reader:
    sql = "INSERT INTO " + table + "(id, name, created_at, updated_at) VALUES(%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], now, now))
  f.close()


def facility_fee_data(file):
  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table = 'reservations_facilityfee'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table + "(id, place_id, age_id, is_group, purpose, fee, created_at, updated_at) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], row[2], row[3], row[4], row[5], now, now))
  f.close()


def reservation_data(file):
  # MySQLへの接続
  connect = mysql.connector.connect(
      db='webhok_reservation',
      user='webhok',
      passwd='lQ8Fmvx0PT1j',
      host='mysql57.webhok.sakura.ne.jp',
      charset='utf8'
  )
  cursor = connect.cursor()

  f = open('./static/reservations/csv/' + file, 'r', encoding='utf8')
  table1 = 'reservations_reservation'

  now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))

  reader = csv.reader(f)
  header = next(reader)
  for row in reader:
    sql = "INSERT INTO " + table1 + "(id, group_name, reader_name, contact_name, address, tel, is_group, delete_flag, start, end, organizer_number, participant_number, purpose, admission_fee, equipment_id, place_id, special_equipment_id, user_id, created_at, updated_at) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], now, now))
  f.close()

  connect.commit()
  cursor.close()
  connect.close()


master_data('age.csv', "reservations_age")
master_data('approval.csv', 'reservations_approval')
master_data('place.csv', 'reservations_place')
master_data('usage.csv', 'reservations_usage')
master_data('equipment.csv', 'reservations_equipment')
master_data('special_equipment.csv', 'reservations_specialequipment')

facility_fee_data('facility_fee.csv')

connect.commit()
cursor.close()
connect.close()

reservation_data('reservation.csv')
