import {JS2Html} from './JS2html';

export function htmljs(js) {
    return JS2Html.generate(js);
}

window.htmljs = window.htmljs || htmljs;