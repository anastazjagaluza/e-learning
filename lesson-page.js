import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './nav-bar.js';
import './sign-in.js';
import 'regenerator-runtime/runtime';

export class LessonPage extends LitElement {
    static get properties(){
        return {
            trial: {
                type: Boolean,
                reflect: true
            }}}
    static get styles(){
        return css`
    :host{
        font-family: var(--main-font);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    #nav {
        width: 100%;
    }
    #container{
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
          }
    #left{
        width: 33%;
        background-color: white;
    }
    #right{
        width: 57%;
        background-color: #444444;
        padding: 5% 5%;
        height: max-content;
        min-height: 100%;
    }
    code{
        background: rgba(255,255,255,0.8);
        border: 1px solid black;
        color: black;
        display: block;
        white-space: pre-wrap;
        padding: .4rem .2rem;
        width: max-content;
        margin: 1rem 0;
        font-size: 120%;
    }
    h2{
        font-weight: 100;
        color: white;
        text-align: center;
    }
    p{
      color: white;
    }
    #list{
        margin-top: 10vh;
    }
    #list {
        width: 100%;
    }
    .blurred{
        filter: blur(10px);}
    a{
        text-decoration: none;
        color: black;
    }
    .lesson{
        color: black;
        padding: 3rem 2rem;
        width: 100%;
        background-color: #F8F7F7;
        cursor: pointer;
    }
    .lesson:hover, .active{
        background-color: #444444;
    }
    .lesson:hover a, .active>a{
        color: white;}
    
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
        padding: 1rem 4rem;
        width: 50vh;
        height: 53vh;
        background-color: white;
    }
    #img{
        height: 40rem;
    }
    ol>li{
        margin-bottom: 1rem;
    }

      `}
    
    constructor(){
      super();
      this.data = [];
      this.lessons = [];
      this.currentLesson = "1.1";
      this.querySearch;
      this.topicName;
      this.topicId;
      this.trial = false;
      this.wall = false;
      this.imageUrl = "";
      this.content;
    }

    firstUpdated(){
      super.firstUpdated();
      this.content = this.shadowRoot.querySelector("#text");
     if(localStorage.getItem('sessionId') == null){
         this.trial = true;
         this.requestUpdate();
     }
      if(this.trial){
        this.querySearch = "1.1";
        this.shadowRoot.querySelector("#container").addEventListener("click", ()=>{
            this.wall = true;
            let blurred = this.shadowRoot.querySelectorAll("h2, p, a");
            for(const el of blurred){
            el.classList.add("blurred");
            }    
            this.requestUpdate();
        })
      }
      else{
      const urlParams = new URLSearchParams(window.location.search);
      this.querySearch = urlParams.get('lessonId');
      this.updateCurrentLesson();
    }
      this.getData();
      this.requestUpdate();
    }

    async getData(){
      let resp = await fetch(`http://localhost:3001/lesson?lessonId=${this.querySearch}`);
      this.data = await resp.json();
      this.topicName = this.data[0].topicName;
      this.topicId = this.data[0].topicId;
      this.data.map(lesson=>{
        if(lesson.lessonId == this.querySearch){
            this.content.innerHTML = lesson.content;
            if(this.content.clientHeight > this.content.scrollHeight){
                console.log("yes")
            }
        }
          if(lesson.lessonId == this.querySearch && lesson.img != null){
            let arrayBufferView = new Uint8Array(lesson.img.data);
            let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            let urlCreator = window.URL || window.webkitURL;
            this.imageUrl = urlCreator.createObjectURL( blob );
            this.shadowRoot.querySelector("#right").style.height = "max-content";
          }
          
      })
      this.requestUpdate();
    }

    async updateCurrentLesson(){
        let newSesion = this.querySearch.slice(0,1) + this.querySearch.slice(2, 3) + localStorage.getItem('sessionId').slice(2);
        localStorage.setItem('sessionId', newSesion);
        let resp = await fetch(`http://localhost:3001/updateLesson`, {method: "POST",  headers: {"content-type": "application/json"}, body: JSON.stringify({userid: (localStorage.getItem("sessionId").slice(4) / 13), currentLesson: this.querySearch})});
    }

  render() {
    return html`
    <nav-bar id="nav" lessonTitle=${this.topicName || " "} topicId="${this.topicId || " "}" ?lesson=${this.trial ? false : true} ?landing=${this.trial ? true : false}></nav-bar>
     <div id="container">
         <div id="left">
             <div id="list">
                 ${this.data.map(lesson=>
                    html`<div @click="${()=>{window.location.href = `lesson.html?lessonId=${lesson.lessonId}`}}" class="lesson ${lesson.lessonId == this.querySearch ? `active` : undefined}">
                                <a href="lesson.html?lessonId=${lesson.lessonId}">${lesson.lessonName}</a>
                         </div>`)}
               </div>
         </div>
         <div id="right">
         ${this.data.map(lesson=>
            html`
            <h2>${lesson.lessonId == this.querySearch ? lesson.lessonName : " "}</h2>
            `)}
           <span id="lessonContent">
            <p id="text"></p>
            ${this.imageUrl.length > 0 ? html `<img id="img" src="${this.imageUrl}">` : undefined}
            </span>
         </div>
     </div>
    ${this.wall ? html`
    <div id="overlay">
            <div id="wall">
            <sign-in id="signup" signup titleText="Sign up for free to continue learning!">
            </sign-in>
        </div>
    </div>
    ` : undefined}
    `;
  }
}

customElements.define('lesson-page', LessonPage);
