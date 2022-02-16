window.onload = function() {
    fetch("./test.xml")
    .then(res => res.text())
    .then(txt => {
        const parser = new XMLParser(txt);
        const contents = parser.get("contents");
        const spanTitle = document.createElement("span");
        spanTitle.textContent = parser.getChild( contents, "text");
        spanTitle.style.fontFamily = parser.getChild( contents, "fontFamily");
        spanTitle.style.fontSize = parser.getChild( contents, "fontSize") + parser.getChild( contents, "fontSizeUnit");

        const updatedate = parser.getChild(contents, "updatedate");
        const spanUpdateDate = document.createElement("span");
        spanUpdateDate.textContent =
        parser.getChild(updatedate, "year") +
        parser.getChild(updatedate, "month") +
        parser.getChild(updatedate, "day") +
        parser.getChild(updatedate, "current");

        const horizoneLine01 = parser.getChild(contents, "horizoneLine01");
        const divLine01 = document.createElement("div");
        divLine01.style.border = parser.getChild(horizoneLine01, "lineWidth") + parser.getChild(horizoneLine01, "widthUnit") + " solid";
        divLine01.style.width = parser.getChild(horizoneLine01, "widthValue") + parser.getChild(horizoneLine01, "widthUnit");

        const div = document.createElement("div");
        div.style.width = parser.getChild(horizoneLine01, "widthValue") + parser.getChild(horizoneLine01, "widthUnit");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "flex-end";
        div.appendChild(spanTitle);
        div.appendChild(spanUpdateDate);
        document.body.appendChild(div);
        document.body.appendChild(divLine01);
    });
}