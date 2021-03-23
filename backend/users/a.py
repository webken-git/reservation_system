import glob


def pdf():
  a = glob.glob("../static/docs/*/*.pdf", recursive=True)
  b = glob.glob("../static/docs/*/*/*.pdf", recursive=True)
  a.extend(b)
  context = {'lists': a}
  print(context)


pdf()
