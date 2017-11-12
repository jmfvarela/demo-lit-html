import { html } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/lib/repeat.js';
import { SamComponent } from './sam.js';

export class Demo2Component extends SamComponent {

    defineActions(actions, propose) { 
        actions.setTime = () => propose({newTime: new Date()})
        actions.tick = () => setTimeout(() => {actions.setTime()}, 1000)
    }

    init(model, actions) {
        actions.setTime()
    }

    updateModel(model, proposal) {
        model.hours = proposal.newTime.getHours()
        model.minutes = proposal.newTime.getMinutes()
        model.seconds = proposal.newTime.getSeconds()
    }

    nextAction(model, actions) {
        actions.tick()
    }

    render(model) {
        return html`
            <style>
            .even { color: blue }
            .odd { color: red }
            </style>
            <button on-click=${(e) => { console.log(e); }}>click me</button>
            <p>Hours: ${ model.hours }, Minutes: ${ model.minutes }, Seconds:
            ${ repeat(
                new Array(model.seconds).fill(0).map((v, i) => i + 1),
                second => second,
                second => html`
                    <span class="${ second % 2 ? "even" : "odd" }">${ second } </span>
                `
            )}
            </p>
        `
    }
}

customElements.define('demo2-component', Demo2Component);
