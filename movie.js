import './main.js';

const template = document.createElement("template");
template.innerHTML = `
<div class="comment-box>
<div class="comment-edit>
<textarea class="comment-input" rows="4" cols="30"></textarea>
<button class="toggle-notes">Notes</button>
</div>
</div>
`

class CommentBox extends HTMLElement {
    constructor() {
        super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
  
}


}

window.customElements.define("comment-box", CommentBox);
