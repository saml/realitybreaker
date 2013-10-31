__author__ = 'saml'

import os
import re


import requests
from flask import g
from realitybreaker import app

SOLR_SPECIAL_CHARS_RE = re.compile(r'(?<!\\)(?P<char>[&|+/\-!(){}[\]^"~*?:])')

def solr_escape(value):
    r"""Escape un-escaped special characters and return escaped value.

    >>> solr_escape(r'foo+') == r'foo\+'
    True
    >>> solr_escape(r'foo\+') == r'foo\+'
    True
    >>> solr_escape(r'foo\\+') == r'foo\\+'
    True
    """
    return SOLR_SPECIAL_CHARS_RE.sub(r'\\\g<char>', value)

class SolrContent(object):
    def __init__(self, base_url):
        self.base_url = base_url
        self.search_url = os.path.join(self.base_url, 'select')
        self.get_url = os.path.join(self.base_url, 'get')
        self.update_url = os.path.join(self.base_url, 'update')

    def get(self, identifier):
        escaped = solr_escape(identifier)
        resp = requests.get(self.search_url, params={'q':escaped, 'wt':'json'}).json()
        docs = resp['docs']
        if len(docs) > 0:
            return docs[0]
        return None

    def set(self, identifier, html):
        pass


def get_contentapi():
    contentapi = getattr(g, '_contentapi', None)
    if contentapi is not None:
        return contentapi

    g._contentapi = SolrContent(app.config['SOLR_URL'])
    return g._contentapi
