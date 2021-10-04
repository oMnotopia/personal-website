//onclick called from inline html, enlarges blog item when clicked and shrinks when clicked again
const hoistingId = document.getElementById('hoisting')

hoistingId.onclick = enlargeBlogItem

function enlargeBlogItem() {
    const origSize = hoistingId.attributes['attr-small'].value
    if(hoistingId.style.height){
        hoistingId.style.removeProperty('height');
    } else {
        hoistingId.style.height = origSize;
    }
}

