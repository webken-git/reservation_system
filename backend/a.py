import datetime


def utc_to_jst(timestamp_utc):
  datetime_utc = datetime.datetime.strptime(timestamp_utc + "+00:00", "%Y-%m-%d %H:%M:%S.%f%z")
  datetime_jst = datetime_utc.astimezone(datetime.timezone(datetime.timedelta(hours=+9)))
  timestamp_jst = datetime.datetime.strftime(datetime_jst, '%Y-%m-%d %H:%M:%S.%f')
  return timestamp_jst


input = '2021-04-08 09:59:59.255667+00:00'
print("[UTC] " + input)
print("[JST] " + utc_to_jst(input))
# ==> "[UTC] 2019-04-09 10:57:13.015"
# ==> "[JST] 2019-04-09 19:57:13.015000"
