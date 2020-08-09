import { ToyReact, Component } from './ToyReact.js';

class MyComponent extends Component{
    constructor() {
        super();
        this.vdom = null;
    }
    render() {
        return <div>
            <div>
                <span>1</span>
                <span>2</span>
            </div>
            <span class="one">hello</span>
            <span>world</span>
            <span>!</span>
            <div class="four">
                {true}
                {this.children}
            </div>
        </div>
    }
    setAttribute(key, value) {
        if (!this.vdom) {
            this.vdom = this.render()
        }
        this.vdom.setAttribute(key, value);
    }
    mountTo(parent) {
        if (!this.vdom) {
            this.vdom = this.render()
        }
        this.vdom.mountTo(parent);
    }
}

const _div = <MyComponent name="name" id="ida">
    <div class="three">child</div>
</MyComponent>

ToyReact.render(_div, document.body);