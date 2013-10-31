__author__ = 'saml'

import requests
from flask_restapi import Resource
from realitybreaker import app

from .contents import get_contentapi

def as_rdfa(url):
    contentapi = get_contentapi()
    doc = contentapi.get(url)
    if doc is None:
        resp = fetch(url)
        resp_rdfa = add_rdfa(resp)
        contentapi.set(url, resp_rdfa)