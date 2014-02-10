function trim(input) {
    return input.replace(/^\s+/, '').replace(/\s+$/, '');
}

function writeln(output, line, level) {
    //var indentation = level*4;
    //output.innerHTML += (Array(indentation + 1).join(' ') + line +'\n');
    output.innerHTML += line;
}

function attributesToString(node) {
    var attributes = node.attributes;
    var n = attributes.length;
    var buffer = [''];
    for (var i = 0; i < n; i++) {
        var attrib = attributes.item(i);
        buffer.push(attrib.name + '="' + attrib.value + '"');
    }
    return buffer.join(' ');
}

function printNode(node, output, prevLevel, level) {
    switch (node.nodeType) {
    case 1: //element
        writeln(output, '<' + node.nodeName.toLowerCase() + attributesToString(node) + '>', level);
        break;
    case 3: //text
        writeln(output, node.nodeValue, prevLevel);
        break;
    case 2:
        alert(node);
        break;
    }
}

function closeNode(node, output, level) {
    if (node.nodeType === 1) {
        writeln(output, '</' + node.nodeName.toLowerCase() + '>', level);
    }
}

function prettyPrintRecurr(node, output, level) {
    printNode(node, output, level, level);
    node = node.firstChild;
    while (node) {
        var nextLevel = level + 1;
        prettyPrintRecurr(node, output, nextLevel);
        closeNode(node, output, nextLevel);
        node = node.nextSibling;
    }
}

function prettyPrint(node, output) {
    output.innerHTML = '';
    prettyPrintRecurr(node, output, 0);
    closeNode(node, output, 0);
}

function main() {
    var wrap = document.getElementById('wrap');
    var reinput = document.getElementById('reinput');
    var tohtml = document.getElementById('tohtml');
    reinput.onclick = function () {
        var output = document.getElementById('output');
        var input = document.getElementById('input');
        wrap.innerHTML = output.textContent;
        prettyPrint(input, output);
    };
    tohtml.onclick = function () {
        var output = document.getElementById('output');
        var input = document.getElementById('input');
        prettyPrint(input, output);
    };
}

main();
