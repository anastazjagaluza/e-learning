import { LitElement, html, css } from 'lit-element';
import './sign-in.js';

export class NavBar extends LitElement {

static get properties(){
    return {
        lesson: {
            type: Boolean,
            reflect: true
        },

        overview: {
            type: Boolean,
            reflect: true
        },
        profile: {
            type: Boolean,
            reflect: true
        },
        landing: {
            type: Boolean,
            reflect: true
        }
        
        
    }
}
constructor(){
    super();
    this.lesson = false;
    this.overview = false;
    this.profile = false;
    this.landing = false;
}
static get styles(){
    return css`
    :host {
        font-family: var(--main-font);
        font-size: 80%;
        font-weight: 300;
        position: absolute;
        top: 0;
        left: 0;
    }
    nav {
        display: flex;
        height: 6vh;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
    }
   
    .end {
        display: flex;
        justify-content: space-between;
        margin-left: auto;
    }
    .titletext {
        display: flex;
        align-items: center;

        margin: auto;
    }
    .titletext > p {
        margin: 0 1rem;
    }
    #login{
        margin-left: auto;
        background-color: var(--light-grey);
        cursor: pointer;
    }
    #goback{
        background: var(--main-blue);
        margin-right: auto;
        color: white;
    }
    a, label {
        font-weight: bold;
        padding: .8rem 1.8rem;
        color: white;
    }
    #profile {
        background: var(--main-blue);
        margin-right: 1rem;

    }
    #signin {
        display: none;
        position: absolute;
        width: 12%;
        height: 4%;
        right: 2%;
        top: 100%;
    }
    #loginInput {
        opacity: 0;
    }
    #loginInput:checked ~ #signin {
        display: block;
    }

    `
}
  render() {
      return html`
      <nav>
         ${this.lesson ? html `<a id="goback">Go back</a>
         <div class="titletext">
            <a>&larr;</a>
            <p>Title text</p>
            <a>&rarr;</a>
        </div>
         ` : undefined}
          
          <div class="end">
              ${this.overview ? html `<a id="profile">Profile</a>` : undefined}
              ${this.profile ? html `<a id="profile">Overview</a>` : undefined}
       ${this.landing ? html` <input id="loginInput" type="checkbox">
          <label for="loginInput" id="login">Log in</label>
          <sign-in id="signin"></sign-in>` : html `<a id="login">Log out</a>`}
                </div>
            </nav>
      `
  }
}

customElements.define('nav-bar', NavBar);
