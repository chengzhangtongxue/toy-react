class ElementWrapper {
    constructor(ele) {
        this.node = document.createElement(ele);
    }
    setAttribute(key, value) {
        this.node.setAttribute(key, value);
    }
    // 这个对 ElementWrapper 生成的实例上的 appendChild 方法
    appendChild(vchild) {
        vchild.mountTo(this.node);
    }
    mountTo(parent) {
        // parent 为真实的dom
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
    constructor() {
        this.children = [];
    }
    appendChild(vchild) {
        // console.log(vchild);
        this.children.push(vchild);
        console.log(this.children);
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
        vdom.mountTo(element);
    }
}