import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './topic-overview.js';
import 'regenerator-runtime/runtime';
import EyeOpen from "./img/eye-open.svg";
import EyeClosed from "./img/eye-closed.svg";

export class ProfilePage extends LitElement {
static get styles(){
    return css`
    :host{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h1{
      font-family: var(--main-font);
      font-size: 300%;
      font-weight: 100;
      text-align: center;
      color: #444444;
      width: 40%;
      height: auto;
    }
    #profilebox{
        width: 30vw;
        height: 60vh;
        background-color: #444444;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form{
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        align-items: center;
        justify-content: space-between;
        height: 80%;
        width: 80%;
    }
    input, span, #buttons{
        background-color: #515151;
        border: 3px solid transparent;
        color: white;
        font-family: var(--main-font);
        padding: .6rem;
        font-size: 120%;
        border-radius: .6rem;
        width: 100%;
        font-weight: 100;
    }
    span{
        display: flex;
        overflow: visible;
    }
    span>input{
        border: 0;
        padding: 0;
        width: auto;
        font-size: 100%;
    }
    #eye{
        width: 1.3rem;
        height: 1.3rem;
        margin-left: auto;
        margin-right: .3rem;
        padding: 0;
        cursor: pointer;
        align-self: center;
    }
    #buttons{
        display: flex;
        justify-content: space-between;
        background: none;
    }
    button{
        font-size: 90%;
        border: none;
        padding: .6rem 1rem;
        color: white;
        background-color: var(--main-blue);
    }
    #delete{
        background-color: var(--light-grey);
    }
    #overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,0.4);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #wall{
        padding: 1rem;
        width: 30vh;
        text-align: center;
        height: 20vh;
        background-color: white;
    }
    p{
        font-family: var(--main-font);
        font-weight: 100;
        margin-bottom: 3rem;
    }
    #error, #success{
        animation: fade 2s forwards;
        margin: 0;
        padding: 0;
        opacity: 1;
        position: absolute;
        bottom: 7rem;
    }
    #error{
        color: var(--error-color);
    }
    #success {
        color: var(--main-blue);
    }
    @keyframes fade {
        to {
            opacity: 0;
        }
    }
      `}
    
    constructor(){
      super();
      this.profileData = {};
      this.error = false;
      this.success = false;
    }

    firstUpdated(){
      super.firstUpdated();
     this.getProfileData();
    this.requestUpdate();
    }

    async getProfileData(){
    let userId = {"userId" : localStorage.getItem("sessionId").slice(4) / 13};
    console.log(userId);
    let resp = await fetch("http://localhost:3001/profile", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userId)});
    if(resp.status == 500){
        this.error = true;
        this.requestUpdate();
    }
    else{
        this.data = await resp.json();
        this.profileData = this.data[0];
        this.requestUpdate();}
    }
    
    async updateData(e){
        e.preventDefault();
        
        let formData = new FormData(e.target);
        let obj = {};
        for(let entry of formData){
            obj[entry[0]] = entry[1];
        }
        obj.userId = localStorage.getItem("sessionId").slice(4) / 13;
        let resp = await fetch("http://localhost:3001/update", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(obj)});
        if(resp.status == 500){
            this.error = true;
            this.requestUpdate();
        }
        else{
        this.success = true;
        console.log(resp);
        this.requestUpdate();
        }
    }

  render() {
    return html`
    <h1>Your profile</h1>
    <div id="profilebox">
        <form @submit="${this.updateData}">
            <input type="text" autocomplete="off" name="name" value="${this.profileData.name || " "}">
            <input type="text" autocomplete="off" name="email" value="${this.profileData.email || " "}">
            <span id="passwordinput">
                <input type="password" name="password" value="${this.profileData.password || ""}">
                <img @click="${e=>{e.target.previousElementSibling.type == "password" ? (e.target.previousElementSibling.type = "text", e.target.src=EyeClosed) : (e.target.previousElementSibling.type = "password", e.target.src=EyeOpen)}}" id="eye" src="${EyeOpen}">
            </span>
            <div id="buttons">
                <button type="button" @click="${()=>{this.dialog = true; this.requestUpdate();}}" id="delete">Delete account</button>
                <button type="submit">Save</button>
            </div>
        </form>
    </div>
    ${this.success ? html `<p id="success">Information updated</p>` : undefined}
    ${this.error ? html `<p id="error">Something went wrong, please try again later</p>` : undefined}
    ${this.dialog ? html`
    <div id="overlay" @click="${()=>{this.dialog = false; this.requestUpdate();}}">
        <div id="wall">
                <p>Are you sure you want to delete your account?</p>
                <button type="button" @click="${()=>{fetch("http://localhost:3001/delete", {method: "POST",  headers: {"content-type": "application/json"}, body: JSON.stringify({userId: localStorage.getItem('userId')})}).then(()=>{localStorage.removeItem('userId'); localStorage.removeItem('currentLesson'); window.location.href="index.html"})}}" id="delete">Delete</button>
    <button @click="${()=>{this.dialog = false; this.requestUpdate();}}" type="submit">Cancel</button>
            </sign-in>
        </div>
    </div>
    ` : undefined}
    `;
  }
}

customElements.define('profile-page', ProfilePage);
