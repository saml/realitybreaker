var ENDSWITH_WHITESPACE = /\s+$/;
var STARTSWITH_WHITESPACE = /^\s+/;
var INLINE_ELEMENTS = {
    b:true, big:true, i:true, small:true, tt:true,
    abbr:true, acronym:true, cite:true, code:true, dfn:true, em:true, kbd:true, strong:true, samp:true, 'var':true,
    a:true, bdo:true, br:true, img:true, map:true, object:true, q:true, script:true, span:true, sub:true, sup:true,
    button:true, input:true, label:true, select:true, textarea:true
};
var BAD_ATTRIBUTES = {
    style:true,
    'class':true,
    id:true
};

function trim(input) {
    return input.replace(/^\s+/, '').replace(/\s+$/, '');
}

function writeln(output, line, level, insertWhitespace) {
    var indentation = level*4;
    if (insertWhitespace) {
        output.innerHTML += ('\n'+Array(indentation + 1).join(' ') + line);
    } else {
        output.innerHTML += line;
    }
}

function attributesToString(node) {
    var attributes = node.attributes;
    var n = attributes.length;
    var buffer = [''];
    for (var i = 0; i < n; i++) {
        var attrib = attributes.item(i);
        if (!(attrib.name.toLowerCase() in BAD_ATTRIBUTES)) {
            if (attrib.value) {//for attribute="false" might fail.
                buffer.push(attrib.name + '="' + attrib.value + '"');
            } else {
                buffer.push(attrib.name);
            }
        }
    }
    return buffer.join(' ');
}

function isInlineElement(node) {
    return node.nodeName.toLowerCase() in INLINE_ELEMENTS;
}


function printNode(node, output, prevLevel, level) {
    switch (node.nodeType) {
    case 1: //element
        writeln(output, '<' + node.nodeName.toLowerCase() + attributesToString(node) + '>', level, !isInlineElement(node));
        break;
    case 3: //text
        writeln(output, trim(node.nodeValue), prevLevel);
        break;
    case 2:
        alert(node);
        break;
    }
}

function closeNode(node, output, level) {
    if (node.nodeType === 1 && node.childNodes.length > 0) {
        writeln(output, '</' + node.nodeName.toLowerCase() + '>', level, !isInlineElement(node));
    }
}

function prettyPrintRecurr(node, output, level) {
    while (node) {
        printNode(node, output, level, level);
        prettyPrintRecurr(node.firstChild, output, level+1);
        closeNode(node, output, level);
        node = node.nextSibling;
    }
}

function prettyPrint(node, output) {
    output.innerHTML = '';
    prettyPrintRecurr(node.firstChild, output, 0);
}

function main() {
    var reinput = document.getElementById('reinput');
    var tohtml = document.getElementById('tohtml');
    reinput.onclick = function () {
        var output = document.getElementById('output');
        var input = document.getElementById('input');
        input.innerHTML = output.textContent;
        prettyPrint(input, output);
    };
    tohtml.onclick = function () {
        var output = document.getElementById('output');
        var input = document.getElementById('input');
        prettyPrint(input, output);
    };
}

main();
