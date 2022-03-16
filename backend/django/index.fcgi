#!/home/wcurling/wmsp.info/public_html/api/env/bin/python
# encoding: utf-8
"""
django-.cgi
A simple cgi script which uses the django WSGI to serve requests.
Code copy/pasted from PEP-0333 and then tweaked to serve django.
http://www.python.org/dev/peps/pep-0333/#the-server-gateway-side
This script assumes django is on your sys.path, and that your site code is at
/djangoproject/src. Copy this script into your cgi-bin directory (or do
whatever you need to to make a cgi script executable on your system), and then
update the paths at the bottom of this file to suit your site.
This is probably the slowest way to serve django pages, as the python
interpreter, the django code-base and your site code has to be loaded every
time a request is served. FCGI and mod_python solve this problem, use them if
you can.
In order to speed things up it may be worth experimenting with running
uncompressed zips on the sys.path for django and the site code, as this can be
(theorectically) faster. See PEP-0273 (specifically Benchmarks).
http://www.python.org/dev/peps/pep-0273/
Make sure all python files are compiled in your code base. See
http://docs.python.org/lib/module-compileall.html
"""


import os
import sys

sys.path.append('/home/wcurling/wmsp.info/public_html/api/reservation_system/backend/django/')

import cgitb
#cgitb.enable()
def my_except_hook(exctype, value, traceback):
    print('Content-Type: text/html')
    print('')
    hook = cgitb.Hook()
    hook(exctype, value, traceback)
    sys.__excepthook__(exctype, value, traceback)

sys.excepthook = my_except_hook

#from wsgiref.handlers import CGIHandler
from flup.server.fcgi import WSGIServer
from config.wsgi import application
WSGIServer(application).run()
