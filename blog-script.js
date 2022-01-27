//onclick called from inline html, enlarges blog item when clicked and shrinks when clicked again
const blogItem = document.querySelectorAll('.blog-item')

//Loop sets an event listener on each blog item.
for (let element of blogItem) {
    element.addEventListener('click', function() {enlargeBlogItem(element)} )
}

//First checks that blog-item has proper attributes, then removes/sets attributes when clicked.
function enlargeBlogItem(element) {
    if(element.attributes['attr-small']===undefined) return
    const origSize = element.attributes['attr-small'].value//stores original height value
    if(element.style.height){
        element.style.removeProperty('height');
    } else {
        element.style.height = origSize;
    }
}




