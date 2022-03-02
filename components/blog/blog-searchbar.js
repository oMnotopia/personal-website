//Search bar script
//Hides topics as user inputs their search. Page will be blank if nothing matches.
//Global variables
const searchInput = document.getElementById('searchInput');
const blogItems = document.getElementsByClassName('blog-item')

//Event handler function, using indexOf() on all the blog items with the users search term as the filter
const reduceTopics = (e) => {
    const filter = searchInput.value.toUpperCase();//toUpperCase() here and below makes search case insensitive
    for(i=0; i<blogItems.length; i++) {

        item = blogItems[i];
        txtValue = item.id.toUpperCase();

        //If indexOf() returns a value greater than -1, the blog "id" must contain the users search string
        if (txtValue.indexOf(filter) > -1) {
          item.style.display = "";
        } else {//user string doesnt match this blog item
          item.style.display = "none";
        }
    }
}

//Event Listener
searchInput.addEventListener('keyup', reduceTopics)