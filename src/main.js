import { ToyReact, Component } from './ToyReact.js';

class MyComponent extends Component{
    
    render() {
        return <div>
            <div>
                <span>1</span>
                <span>2</span>
            </div>
            <span class="one">hello</span>
            <span>world</span>
            <span>!</span>
        </div>
    }
}

const _div = <MyComponent id="name"></MyComponent>


ToyReact.render(_div, document.body);