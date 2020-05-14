import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { OverviewPage }  from './overview-page.js'
export class PlatformShell extends LitElement {
static get properties(){
    return {
        currentLesson: {
             type: String,
             reflect: true
        },
    }}
static get styles(){
    return css`
    :host{
        width: 100%;
        height: 100%;
    }
    #navbar{
        width:100%;
    }

    #container{
        width: 100%;
        height: 100%;
    }

    `
    }
    constructor(){
        super();
        this.navbar;
        this.container;
        this.currentLesson;
    }

    firstUpdated(){
        super.firstUpdated();
        this.toOverview();
        this.requestUpdate();
    }

    toOverview(){
        this.container = this.shadowRoot.querySelector("#container");
        this.navbar = this.shadowRoot.querySelector("#navbar");
        this.navbar.overview = true;
        let overview = new OverviewPage();
        this.container.removeChild(this.container.lastChild);
        this.container.appendChild(overview);
        this.requestUpdate();
 
    }

  render() {
    return html`
    <nav-bar id="navbar"></nav-bar>
   <div id="container">
    </div>
    `;
  }
}

customElements.define('platform-shell', PlatformShell);
