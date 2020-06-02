import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './topic-overview.js';
import 'regenerator-runtime/runtime';

export class OverviewPage extends LitElement {
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
      font-size: 400%;
      font-weight: 100;
      text-align: center;
      width: 40%;
      height: auto;
      color: #444444;
    }
    #topics {
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-content: flex-start;
    }
    header{
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: center;
        align-items: center;
      padding-top: 4rem;
    }
      `}
    
    constructor(){
      super();
      this.data = [];
      this.lessons = [];
    }

    firstUpdated(){
      super.firstUpdated();
      this.getAllLessons();
      this.lessons = [];
      console.log(this.lessons);
      this.requestUpdate();
    }

    async getAllLessons(){
      let resp = await fetch("http://localhost:3001/overview");
      this.data = await resp.json();
      let topics = [];
      for(const elem of this.data){
        topics[elem.topicId] = topics[elem.topicId] || [];
        topics[elem.topicId].push([]);
        topics[elem.topicId][0].push({ "lessonName": elem.lessonName, "lessonId": elem.lessonId });
        topics[elem.topicId].topicName = elem.topicName;
        topics[elem.topicId].topicId = elem.topicId;
      }
      this.data = topics;
      this.requestUpdate();
    }

  render() {
    return html`
    <header id="top">
    <h1>Overview of your progress</h1>
  </header>
    <div id="topics">
       ${this.data.map(topic=>
        html`<topic-overview .lessons=${topic[0]} topicId="${topic.topicId}" topicName="${topic.topicName}"></topic-overview>`)}
    </div>
    `;
  }
}

customElements.define('overview-page', OverviewPage);
