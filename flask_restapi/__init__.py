import operator

from flask import abort

from .helpers import is_accept, is_method, is_mimetype

class Resource(object):
    def __init__(self):
        self.dispatch = []
        self.methods = set()

    def method(self, http_method):
        pred = is_method(http_method)
        self.methods.add(http_method)
        return self._if(pred)

    def accept(self, http_accept):
        return self._if(is_accept(http_accept))

    def mimetype(self, http_content_type):
        return self._if(is_mimetype(http_content_type))

    def when(self, method=None, accept=None, mimetype=None):
        preds = []
        if method is not None:
            self.methods.add(method)
            preds.append(is_method(method))

        if accept is not None:
            preds.append(is_accept(accept))

        if mimetype is not None:
            preds.append(is_mimetype(mimetype))

        def pred():
            for predicate in preds:
                if not predicate():
                    return False
            return True

        return self._if(pred, len(preds))

    def _if(self, pred, length=1):
        '''Adds pred of given length to list of predicates to be used for request dispatch.
        By default, pred length is 1.'''
        def wrapped(fn):
            self.dispatch.append((length, pred, fn))
            return fn
        return wrapped

    def as_view(self):
        self.dispatch.sort(key=operator.itemgetter(0), reverse=True) #sort by predicate length.
        def fn(*args, **kwargs):
            for pred_length,pred,f in self.dispatch:
                if pred():
                    return f(*args, **kwargs)

            # request doesn't match any predicate
            abort(400)
        return fn

def route(app, rule, resource, endpoint, **options):
    view_func = resource.as_view()
    methods = [method for method in resource.methods]
    app.add_url_rule(rule, view_func=view_func, methods=methods, endpoint=endpoint, **options)


