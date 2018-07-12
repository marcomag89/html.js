# html.js (unreleased)
html generator from js object

No more HTML strings in your javascript code!
##Install
__npm__
```bash
npm install html-js
```
__yarn__
```yarn
yarn add html-js
```
## Example
```JS
const djs = [
        {_: 'div', boundedValue:'{{myBoundedValue}}', $:[
            'some text',
            {_:'customTag', cass:['bold', 'italic']} 
        ]}
    ]
let result = htmljs(djs);
console.log('result');
```
that prints 

```html
    <body class="my-body" bounded-value="{{myBoundedValue}}">
        someText
        <custom-tag class="bold italic"></custom-tag>
    </body>
```