import { LitElement, html, css, unsafeCSS } from 'lit-element';
import 'regenerator-runtime/runtime';

export class TopicOverview extends LitElement {
    static get properties(){
        return {
            open: {
                type: Boolean,
                reflect: true
            },

            finished: {
                type: Boolean,
                reflect: true
            },
            
            lessons: {
                type: Array,
                reflect: true
            },

            topicId: {
              type: String,
              reflect: true
          },

          topicName: {
            type: String,
            reflect: true
        },
          currentLesson: {
            type: String,
            reflect: true
          }
        }
    }
static get styles(){
    return css`
    :host, #lessons{
      display: flex;
      flex-direction: column;
      width: 12rem;
      text-align: left;
      font-family: var(--main-font);
    }
    label{
      color: white;
    }
    #topic {
     display: none;
    }
    #lessons{
      display: none;
      height: 0px;
    }
    #topic:checked ~ #lessons{
      transition: 1s;
      display: flex;
      height: 100%;
    }
    a, label {
      font-weight: 100;
      padding: 1rem .3rem;
      text-decoration: none;
    }
      `}
    
    constructor(){
      super();
      this.open = false;
      this.finished = false;
      this.topicId;
      this.topicName;
      this.lessons = [];
      this.color = "#000000";
      this.currentLesson;
    }

    firstUpdated(){
        super.firstUpdated();
        this.currentLesson = localStorage.getItem("currentLesson");
        if(this.topicId == this.currentLesson.substring(0, 1)){
          this.open = true;
        }
        else if(this.topicId < this.currentLesson.substring(0,1)){
          this.finished = true;
        }
        console.log(this.lessons);
        this.finished ? this.color = "#F8F6F6" : undefined;
        this.open ? this.color = "var(--main-blue)" : undefined;
        this.color == undefined ? this.color = "black" : undefined;
        this.requestUpdate();
       
    }
    

  render() {
    return html`
    <input type="checkbox" ?checked="${this.open}" id="topic">
    <label style="background-color: ${this.color}; ${this.finished ? `color: black` : undefined}"  for="topic">${this.topicName}</label>
    ${this.lessons.length > 0 ? 
      html `<div id="lessons">${this.lessons.map(lesson=>
             html`<a style="${lesson.lessonId==this.currentLesson ? `background-color: black; color: white` : `background-color: #F8F6F6; color: black`}" href="?lessonId=${lesson.lessonId}">${lesson.lessonName}</a>`)}</div>` : undefined}
             `;
  }
}

customElements.define('topic-overview', TopicOverview);
