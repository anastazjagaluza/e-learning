import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { OverviewPage }  from './overview-page.js'
import { ProfilePage }  from './profile-page.js'
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
        const urlParams = new URLSearchParams(window.location.search);
        this.container = this.shadowRoot.querySelector("#container");
        this.navbar = this.shadowRoot.querySelector("#navbar");
        if(urlParams.get('p')){
            this.toProfile();
            
        }
        else{
        this.toOverview();}
        this.requestUpdate();
    }

    toOverview(){
        let overview = new OverviewPage();
        this.container.removeChild(this.container.lastChild);
        this.container.appendChild(overview);
        this.navbar.overview = true;
        this.navbar.profile = false;
        this.requestUpdate();
 
    }

    toProfile(){
        let profile = new ProfilePage();
        this.container.removeChild(this.container.lastChild);
        this.container.appendChild(profile);
        this.navbar.profile = true;
        this.navbar.overview = false;
        this.requestUpdate();
    }

  render() {
    return html`
    <nav-bar @toOverview="${()=>{this.toOverview()}}" @toProfile="${()=>{this.toProfile()}}" id="navbar"></nav-bar>
   <div id="container">
    </div>
    `;
  }
}

customElements.define('platform-shell', PlatformShell);
