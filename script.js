//onclick called from inline html, enlarges blog item when clicked and shrinks when clicked again
const scopeId = document.getElementById('scope');
//const hoistingId = document.getElementById('hoisting')

scopeId.onclick = enlargeBlogItem(this)
//hoistingId.onclick = enlargeBlogItem(this)

function enlargeBlogItem(el) {
    const origSize = el.getAttribute('attr-small')
    if(el.style.height){
        el.style.removeProperty('height');
    } else {
        el.style.height = origSize;
    }
}

