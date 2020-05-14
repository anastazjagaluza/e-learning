import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './nav-bar.js';
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
    }
    #topics {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-content: flex-start;
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
      this.lessons = [
        {"lessonId": "1.1",
        "lessonName": "first lesson"},
        {"lessonId": "1.2",
        "lessonName": "helo world"},
        {"lessonName": "it's me",
          "lessonId": "2.3"}
      ];
      console.log(this.lessons);
      this.requestUpdate();
    }

    async getAllLessons(){
      let resp = await fetch("http://localhost/elearning/get-overview.php");
      this.data = await resp.json();
      console.table(this.data);
      this.requestUpdate();
    }

  render() {
    return html`
    <h1>Overview of your progress</h1>
    <div id="topics">
      <topic-overview .lessons=${this.lessons} topicId="1" topicName="Topic 1"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="2" topicName="Topic 2"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="3" topicName="Topic 3"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="4" topicName="Topic 4"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="5" topicName="Topic 5"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="6" topicName="Topic 6"></topic-overview>
      <topic-overview .lessons=${this.lessons} topicId="7" topicName="Topic 7"></topic-overview>
    </div>
    `;
  }
}

customElements.define('overview-page', OverviewPage);
