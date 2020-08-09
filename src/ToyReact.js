class ElementWrapper {
    constructor(ele) {
        this.node = document.createElement(ele);
    }
    setAttribute(key, value) {
        this.node.setAttribute(key, value);
    }
    appendChild(vchild) {
        vchild.mountTo(this.node);
    }
    mountTo(parent) {
        parent.appendChild(this.node);
    }
}

class TextWrapper {
    constructor(ele) {
        this.node = document.createTextNode(ele);
    }
    mountTo(parent) {
        parent.appendChild(this.node);
    }
}

export class Component {
    setAttribute(key, value) {
        this[key] = value;
    }
    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }
}

export const ToyReact = {
    createElement(ele, params, ...children) {
        let _element = null;
        if (typeof ele === 'string') {
            _element = new ElementWrapper(ele);
        } else {
            _element = new ele;
        }
        
        for (let key in params) {
            _element.setAttribute(key, params[key]);
        }
        console.log(children);
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            _element.appendChild(child);
        }
        return _element;
    },
    render(vnode, element) {
        vnode.mountTo(element);
    }
}