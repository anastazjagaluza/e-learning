import { LitElement, html, css } from 'lit-element';
import 'regenerator-runtime/runtime';
export class SignIn extends LitElement {

static get properties(){
    return {
        titleText: {
            type: String,
            reflect: true
        },
        signup: {
            type: Boolean
        }
        
    }
}
constructor(){
    super();
    this.titleText;
    this.signup = false;
}
static get styles(){
    return css`
    :host{
        font-family: var(--main-font);
    }
    h1{
        text-align: center;
        margin-bottom: -2%;
        font-size: 270%;
        font-weight: 100;
    }
    form{
        background-color: white;
       display: flex;
       flex-direction: column; 
       padding: 1rem; 
    }
    input{
        outline: 1px solid black;
        height: 1.4rem;
        margin: 6% 0;
        padding: 0 .8rem;
   
    }
    input::placeholder{
        color: black;
    }
    button{
        width: auto;
        height: auto;
        padding: .3rem 1.3rem;
        box-shadow: none;
        border: none;
        color: white;
        font-size: 130%;
        background: var(--main-blue);
    }
    `
}
    async signIn(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let obj = {};
        for(let entry of formData){
            obj[entry[0]] = entry[1];
        }
        let resp = await fetch("http://localhost:3000/signin", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(obj)});
        resp = await resp.json();
        localStorage.setItem("currentLesson", resp[0].currentLesson);
        window.location.href = "http://localhost:1234/platform.html"
    }

    async signUp(e){
        //TODO:
        console.log("Signing up for the very first time!");

    }

  render() {
    return html`
         ${this.signup ? html` <h1>${this.titleText}</h1> ` : undefined}
      <form method="POST" style="${!this.signup ? `box-shadow: 1px 1px 6px, -1px -1px 3px rgba(0,0,0, 0.01);` : undefined}" @submit="${this.signup ? this.signUp : this.signIn}">
          ${this.signup ? html `<input type="text" name="name" placeholder="Your name">` : undefined}
          <input type="email" name="email" placeholder="Email address">
          <input type="password" name="password" placeholder="Your password">
          <button style="${this.signup ? `align-self: flex-end;` : `align-self: stretch`}" type="submit">${this.signup ? `Join` : `Log in`}</button>
          </form>
    `;
  }
}

customElements.define('sign-in', SignIn);
