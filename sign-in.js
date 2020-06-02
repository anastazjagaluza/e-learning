import { LitElement, html, css } from 'lit-element';
import 'regenerator-runtime/runtime';
import './loader-spinner.js';

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
    this.error = "";
    this.loading = false;
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
        text-align: center;
        background: var(--main-blue);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #error {
        margin-top: -1rem;
        text-align: center;
        color: var(--error-color);
        font-size: 90%;
        margin-top: .3rem;
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
        this.loading = true;
        this.requestUpdate();
        let resp = await fetch("http://localhost:3001/login", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(obj)});
        if(resp.status == 500){
            this.error = "Something went wrong, please try again later";
            this.loading = false;
            this.requestUpdate();
        }
        if(resp.status == 404){
            this.loading = false;
            this.error = "The email or password is incorrect";
            this.requestUpdate();
        }
        else{
        resp = await resp.json();
        localStorage.setItem("sessionId", resp);
        window.location.href = "http://localhost:1234/platform.html"
        console.log(resp);
    }
    }

    async signUp(e){
      e.preventDefault();
        let formData = new FormData(e.target);
        let obj = {};
        for(let entry of formData){
            obj[entry[0]] = entry[1];
        }
        this.loading = true;
        this.requestUpdate();
        let resp = await fetch("http://localhost:3001/signup", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(obj)});
        if(resp.status == 500){
            this.error = "Something went wrong, please try again later";
            this.loading = false;
            this.requestUpdate();
        }
        if(resp.status==302){
            this.loading = false;
            this.error = "This email is already taken";
            this.requestUpdate();
        };
        resp = await resp.json();
        localStorage.setItem("sessionId", resp);
        window.location.href = "http://localhost:1234/platform.html"
    }

  render() {
    return html`
         ${this.signup ? html` <h1>${this.titleText}</h1> ` : undefined}
      <form method="POST" style="${!this.signup ? `box-shadow: 1px 1px 6px, -1px -1px 3px rgba(0,0,0, 0.01);` : undefined}" @submit="${this.signup ? this.signUp : this.signIn}">
          ${this.signup ? html `<input type="text" name="name" placeholder="Your name">` : undefined}
          <input type="email" name="email" placeholder="Email address">
          ${this.error.length > 1 ? html `<p id="error">${this.error}</p>` : undefined}
          <input type="password" name="password" placeholder="Your password">
          <button style="${this.signup ? `align-self: flex-end;` : `align-self: stretch`}" type="submit">${this.loading ? html `<loader-spinner id="loader"></loader-spinner>` : this.signup ? `Join` : `Log in`}</button>
          </form>
    `;
  }
}

customElements.define('sign-in', SignIn);
