from flask import request

def is_accept(content_type):
    def pred():
        return next((x for x,q in request.accept_mimetypes if x == content_type), None)
    return pred

def is_method(method):
    def pred():
        return request.method == method
    return pred

def is_mimetype(mimetype):
    def pred():
        return request.mimetype == mimetype
    return pred



