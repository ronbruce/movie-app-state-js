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

 const info = this.shadowRoot.querySelector("#mytextarea");
 const toggleBtn = this.shadowRoot.querySelector("#toggle-info");

 if(this.showtextarea) {
    info.style.display = "block";
    toggleBtn.innerText = "Hide Notes";
 } else {
    info.style.display = "none";
    toggleBtn.innerText = "Show Notes";
    
 }

}

// 1. Life cycle method
// 2. In my life cycle method I'm calling this.toggleInfo
// 3. Create toggle info within class

connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}


window.customElements.define("comment-box", CommentBox);
