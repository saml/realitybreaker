import rdflib

with open('index.html', 'r') as f:
    g = rdflib.Graph()
    ns = rdflib.Namespace("http://schema.org/")
    result = g.parse(f, format='html')
    for a,b,c in result:
        print(a,b,c)
    print((ns.Article, None, None) in result)
