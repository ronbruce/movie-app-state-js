import './main.js';

const template = document.createElement("template");
template.innerHTML = `
<div class="comment-box>
<div class="comment-info>
<textarea rows="4" cols="30" id="mytextarea"></textarea>
<button id="toggle-info">Hide Notes</button>

</div>
</div>
`

class CommentBox extends HTMLElement {
    constructor() {
        super();

      this.showtextarea  = true;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
   
}

toggleInfo() {
 this.showtextarea = !this.showtextarea;

 const toggleBtn = this.shadowRoot.querySelector("#toggle-info");

 if(this.showtextarea) {
    
    toggleBtn.innerText = "Hide Notes";
 } else {
   
    toggleBtn.innerText = "Show Notes";
    
 }

}
connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}


window.customElements.define("comment-box", CommentBox);
