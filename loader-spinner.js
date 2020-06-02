import { LitElement, html, css } from 'lit-element';

export class LoaderSpinner extends LitElement {

constructor(){
    super();
}
static get styles(){
    return css`
    :host{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #circle, #inner{
        width: 1.6rem;
        height: 1.6rem;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: spin 2s infinite ease-in-out;
       }
    @keyframes spin{
        to {
            transform: rotate(360deg);
        }
    }
    #inner{
        background: var(--main-blue);
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        border: 1px solid var(--main-blue);
    }

    `
}
  render() {
      return html`
      <div id="circle">
        <div id="inner">
        </div>
      </div>
   
      `
  }
}

customElements.define('loader-spinner', LoaderSpinner);
