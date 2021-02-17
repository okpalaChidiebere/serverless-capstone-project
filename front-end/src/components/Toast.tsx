import React from 'react'
import ReactDOM from 'react-dom'
const transition = require('simple-transition')
//const closest = require('closest')

interface Props {
    text: string,
    buttons: string[],
    hanldeOnclick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
const Toast: React.FC<Props> = ({text, buttons, hanldeOnclick}) => {

    return(
        <div className="toasts">
            <div className="toast">
                <div className="toast-content">{text}</div>
                {buttons.map(button => 
                    (<button 
                    key={button} 
                    className="unbutton" 
                    name={button} 
                    onClick={hanldeOnclick}
                    >
                        {button}
                    </button>))}
            </div>
        </div>
    )
}

export default class Toasts {

    //answerResolver: (value: string | PromiseLike<string> | null) => void = () => {}
    goneResolver: (value: string | PromiseLike<string> | null) => void = () => {}
    hideTimeout: NodeJS.Timeout = setTimeout(() => this.hideTimeout, 0)

    //constructor(){
        /*document.querySelector('#toast')?.addEventListener('click', (event) => {
            
            const button = closest(event.target, 'button', true);
            if (!button) return;

            //console.log(button.textContent)
            this.answerResolver(button.textContent);
            //this.removeNode();
        });*/
    //}

    /*async answer(){
        return new Promise(resolve => {
            this.answerResolver = resolve;
        })
    }*/

    async gone(){
        return new Promise(resolve => {
            this.goneResolver = resolve;
        })
    }

    removeNode = async (container: DocumentFragment) => {

        transition(document.querySelector('.toast'), {
            opacity: 0
        }, 0.3, 'ease-out')
        this.gone().then(() => {
            document.querySelector('#toast')?.childNodes[0].remove();
        })      
    };

    show = (
        message: string, 
        opts: {duration: number, buttons: string[]} = { duration: 0, buttons: ['Dismiss']},
        hanldeOnclick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = () => this.hide()
        ) => {

        const container = contextRange.createContextualFragment(toastTemplate(message, opts.buttons, hanldeOnclick))
        //document.querySelector('#toast')?.appendChild(container)

        ReactDOM.render(
        <Toast 
        text={message} 
        buttons={opts.buttons} 
        hanldeOnclick={hanldeOnclick} 
        />,  document.querySelector('#toast'))

        transition(document.querySelector('.toast'), {
            opacity: 1
          }, 0.5, 'ease-out')

        if(opts.duration !== 0)
            setTimeout(() => this.removeNode(container), opts.duration)
    }

    hide() {
        clearTimeout(this.hideTimeout);
        //this.answerResolver(null)
        transition(document.querySelector('.toast'), {
          opacity: 0
        }, 0.3, 'ease-out').then(this.goneResolver)
        
        return this.gone
    }
}


function toastTemplate(
    text: string, 
    buttons: string[], 
    hanldeOnclick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,) {

    return(
        `<div class="toasts">
            <div class="toast">
                <div class="toast-content">${text}</div>
                ${buttons.map(button => `<button class="unbutton" name=${button}>${button}</button>`).join('')}
            </div>
        <div>`
    )
}
const contextRange = document.createRange()
contextRange.setStart(document.body, 0)