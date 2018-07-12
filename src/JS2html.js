import pretty from 'pretty';

export class JS2Html {
    static __formatTag(tagName) {
        //TODO remove invalid chars
        return this.__camelToDash(tagName.trim());
    }

    static __formatPropertyKey(key){
        key = key.trim();
        let dollarEnding = key.endsWith('$');
        let doDash = key.replace(/\$$/,'');
        let dashed = this.__camelToDash(doDash);
        return dollarEnding ? dashed.concat('$') : dashed;
    }

    static __formatPropertyValue(value) {
        //TODO Quote escaping strategy
        return `"${Array.isArray(value) ? value.join(' ') : value}"`;
    }

    static __camelToDash(str) {
        return str
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([0-9])([^0-9])/g, '$1-$2')
            .replace(/-+/g, '-')
            .toLowerCase();
    }

    static __generateAttributeList(js) {
        return (Object.keys(js) || [])

        //remove body and non property values
            .filter(node => node !== '_' && node !== '$' && js.hasOwnProperty(node))

            //map to key-value array
            .map(key => ([key, js[key]]))

            //generate key-value string array
            .reduce((red, item) => red.concat(
                [
                    this.__formatPropertyKey(item[0]),
                    this.__formatPropertyValue(item[1])
                ].join('=')
            ), [])

            //join to single string to return
            .join(' ')
            ;

    }

    static __generateNode(js) {
        let nodeName = this.__formatTag(js._ || 'span');
        return `
            <${nodeName} ${this.__generateAttributeList(js)}>
                ${this.__parseJs(js.$)}
            </${nodeName}>
        `;
    }

    static __parseJs(js) {
        return typeof js === 'string' ? js :
               Array.isArray(js) ? js.reduce((red, item) => red.concat([' ', this.__parseJs(item)].join(' ')), '') :
               typeof js === 'object' ? this.__generateNode(js) : '';
    }

    static generate(jsRoot, prettyfy = true) {
        let js = JSON.parse(JSON.stringify(jsRoot)); //clone and prevent loops
        let result = this.__parseJs(js);
        return prettyfy ? pretty(result, {ocd: true}) : result;
    }
}