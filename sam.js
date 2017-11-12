import { render } from './node_modules/lit-html/lit-html.js';

export class SamComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        const _model = {}
        const _actions = {}
        let _needsRender
        const _stateRepresentation = () => {
            if (!_needsRender) {
                _needsRender = true
                Promise.resolve().then(() => {
                    _needsRender = false
                    render(this.render(_model), this.shadowRoot)
                });
            }
        }
        const _propose = (_proposal) => {
            this.updateModel(_model, _proposal)
            _stateRepresentation(_model)
            this.nextAction(_model, _actions)
        }
        this.defineActions(_actions, _propose)
        this.init(_model, _actions)
    }
}