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
        },
        lessonTitle: {
            type: String,
            reflect: true
        },
         
        topicId: {
            type: String,
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
    this.lessonTitle = " ";
    this.topicId = " ";
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
        background-color: var(--nav-back);
    }
    nav {
        display: flex;
        height: 6vh;
        align-items: center;
        justify-content: space-between;
        padding: 2vh 3vh;
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
        text-decoration: none;
    }
    #profile, #lessonProfile {
        background: var(--main-blue);
        margin-right: 1rem;
        cursor: pointer;
    }
    #lessonProfile{
        background: transparent;
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
    #lessonTitle{
        font-weight: 100;
        color: white;
    }

    `
}
  render() {
      return html`
      <nav>
         ${this.lesson ? html `<a href="platform.html" id="goback">Go back</a>
         <div class="titletext">
            <a href="lesson.html?lessonId=${Number(this.topicId) > 1 ? `${Number(this.topicId) - 1}.1` : `1.1`}">&larr;</a>
  <h1 id="lessonTitle">${this.topicId + '. ' + this.lessonTitle || " "}</h1>
            <a href="lesson.html?lessonId=${Number(this.topicId) < 6 ? `${Number(this.topicId) + 1}.1` : `6.1`}">&rarr;</a>
        </div>
         ` : undefined}
          
          <div class="end">
              ${this.overview ? html `<a id="profile" @click="${()=>{this.dispatchEvent(new CustomEvent("toProfile", {bubbles: true}))}}">Profile</a>` : undefined}
              ${this.profile ? html `<a id="profile" @click="${()=>{this.dispatchEvent(new CustomEvent("toOverview", {bubbles: true}))}}">Overview</a>` : undefined}
            ${this.lesson ? html`<a @click="${()=>{window.location.href = "platform.html?p=p"}}" id="lessonProfile">Profile</a>` : undefined}
       ${this.landing ? html` <input id="loginInput" type="checkbox">
          <label for="loginInput" id="login">Log in</label>
          <sign-in id="signin"></sign-in>` : html `<a style="${this.lesson ? `background-color: transparent` : undefined}" @click="${()=>{localStorage.removeItem('sessionId');window.location.href="index.html"}}" id="login">Log out</a>`}
                </div>
            </nav>
      `
  }
}

customElements.define('nav-bar', NavBar);
