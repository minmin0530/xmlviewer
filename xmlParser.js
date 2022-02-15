class XMLParser {
    constructor(text){

        let start = 0;
        let end = 0;

        let children = [];

        for (let l = 0; l < 2; ++l) { 
            start = text.indexOf("<", start);
            end = text.indexOf(">", start);
            if (end >= 1) {
                const token = text.substring(start + 1, end);
                if (token.indexOf("?xml", start) >= 0) {
                    start = end + 1;
                } else {
                    let contentStart = end;
                    start = text.indexOf("</" + token + ">", end);
                    let contentEnd = start;
                    end = text.indexOf(">", start);
                    const tokenEnd = text.substring(start, end);
                    
                    const content = text.substring(contentStart + 1, contentEnd);
                    let data = {};
                    data[token] = this.parse(content);
                    data["key"] = token;
                    children.push(data);
                }
            }
        }
        this.xml = children;
    }
    parse(text) {

        let start = 0;
        let end = 0;

        let children = [];
        while (true) {
            start = text.indexOf("<", start);
            end = text.indexOf(">", start);
            if (start >= 1 && end >= 1) {
                const token = text.substring(start + 1, end);
                let contentStart = end;
                start = text.indexOf("</" + token + ">", end);
                let contentEnd = start;
                end = text.indexOf(">", start);
                const tokenEnd = text.substring(start, end);
                start = end + 1;
                const content = text.substring(contentStart + 1, contentEnd);
                let data = {};
                data[token] = this.parse(content);
                data["key"] = token;
                children.push(data);
            } else {
                break;
            }
        }
        if (children.length == 0) {
            return text;
        }
        return children;
    }

    get(key) {

        for (const content of this.xml) {
            if (!content[key]) {
                return this.getChild(content[content["key"]], key);
            } else {
                return content[key];
            }
        }
    }
    getChild(contents, key) {
        if (Array.isArray(contents)) {
            for (const content of contents) {
                if (!content[key]) {
                    const ret = this.getChild(content[content["key"]], key);
                    if (ret === undefined) {
                        continue;
                    } else {
                        return ret;
                    }
                } else {
                    return content[key];
                }
            }
        } else {
            return contents[key];
        }
    }
}