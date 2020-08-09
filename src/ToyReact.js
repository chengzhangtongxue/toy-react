class ElementWrapper {
    constructor(ele) {
        this.node = document.createElement(ele);
    }
    setAttribute(key, value) {
        // 添加on事件
        if (key.match(/^on([\s\S]+)$/)) {
            this.node.addEventListener(RegExp.$1.toLowerCase() , value);
        }
        if (key === 'className') {
            key = 'class';
        }
        this.node.setAttribute(key, value);
    }
    // 这个对 ElementWrapper 生成的实例上的 appendChild 方法
    appendChild(vchild) {
        let range = document.createRange();
        if (this.node.children.length) {
            range.setStartAfter(this.node.lastChild);
            range.setEndAfter(this.node.lastChild);
        } else {
            range.setStart(this.node, 0);
            range.setEnd(this.node, 0);
        }
        vchild.mountTo(range);
    }
    mountTo(range) {
        // parent 为真实的dom
        // parent.appendChild(this.node);
        range.deleteContents();
        range.insertNode(this.node);
    }
}

class TextWrapper {
    constructor(ele) {
        this.node = document.createTextNode(ele);
    }
    mountTo(range) {
        range.deleteContents();
        range.insertNode(this.node);
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }
    setAttribute(key, value) {
        this.props[key] = value;
        this[key] = value;
    }
    mountTo(range) {
        this.range = range;
        // vdom.mountTo(parent);
        this.update();
    }
    update() {
        let placeholder = document.createComment('placeholder');
        let range = document.createRange();
        range.setStart(this.range.endContainer, this.range.endOffset);
        range.setEnd(this.range.endContainer, this.range.endOffset);
        range.insertNode(placeholder);

        this.range.deleteContents();

        let vdom = this.render();
        vdom.mountTo(this.range);
    }
    appendChild(vchild) {
        this.children.push(vchild);
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] !== 'object') {
                        oldState[p] = {}
                    }
                    merge(oldState[p], newState[p]);
                } else {
                    oldState[p] = newState[p];
                }
            }
        }
        if (!this.state && state) {
            this.state = {};
        }
        merge(this.state, state);
        console.log(this.state)
        this.update();
    }
}

export const ToyReact = {
    // 自定义组件传递或者是div span原生字符串传递
    createElement(ele, params, ...children) {
        let _element = null;
        if (typeof ele === 'string') {
            _element = new ElementWrapper(ele);
        } else {
            _element = new ele;
        }
        
        let insertChildren = (children) => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(child);
                } else {
                    if (!(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)) {
                            child = String(child);
                            child = new TextWrapper(child);
                    }
                    _element.appendChild(child);
                }
            }
        }
        insertChildren(children);

        for (let key in params) {
            _element.setAttribute(key, params[key]);
        }
        
        return _element;
    },
    render(vdom, element) {
        let range = document.createRange();
        range.setStart(element, 0);
        range.setEnd(element, 0);
        vdom.mountTo(range);
    }
}