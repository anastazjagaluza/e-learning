import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './sign-in.js';
import './nav-bar.js';
import GirlPic from "./img/landing-girl.jpg";

export class LoginPage extends LitElement {
static get styles(){
    const GirlImage = GirlPic;
    return css`
    :host{
        width: 100%;
        height: 100%;
    }
    #left, #right{
       flex: 1;
    }
    #left{
    background-image: url('${unsafeCSS(GirlImage)}');
    background-size: 100% auto;
    background-position: center;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    justify-content: space-between;
    }

    #right{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column; 
    }
    #signin{
        width: 50%;
        height: 40%;
    }
    #navbar{
        width:100%;
    }
    h1{
      font-family: var(--main-font);
      font-weight: 100;
      text-decoration: underline;
      margin-top: 3rem;
    }
    #left > p {
      font-family: var(--main-font);
      color: white;
      font-size: 300%;
      background-color: var(--main-blue);
      width: 70%;
      height: max-content;
      padding-left: .6rem;
    }
    #second{
      align-self: flex-end;
    }

    `
}
  render() {
    return html`
      <nav-bar landing id="navbar"></nav-bar>
      <div id="left">
        <p>Wanna learn about databases?</p>
        <p id="second">Join today and start learning for free!</p>
      </div>
      <div id="right">
        <sign-in id="signin" signup titletext="Sign up for free..."></sign-in>
        <h1>...or see a sample lesson</h1>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
