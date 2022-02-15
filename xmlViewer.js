window.onload = function() {
    fetch("./test.xml")
    .then(res => res.text())
    .then(txt => {
        const parser = new XMLParser(txt);
        const contents = parser.get("contents");
        const div = document.createElement("div");
        div.textContent = parser.getChild( contents, "text");
        div.style.fontFamily = parser.getChild( contents, "fontFamily");
        div.style.fontSize = parser.getChild( contents, "fontSize") + parser.getChild( contents, "fontSizeUnit");
        document.body.appendChild(div);
    });
}