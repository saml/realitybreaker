__author__ = 'saml'

import os
from flask import Flask

app = Flask(__name__)
app.config.from_object('settings')
if os.environ.get('REALITYBREAKER_SETTINGS_PATH') is not None:
    app.config.from_envvar('REALITYBREAKER_SETTINGS_PATH')


from flask_restapi import route

