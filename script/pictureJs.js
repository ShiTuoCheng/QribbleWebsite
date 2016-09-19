/**
 * Created by shituocheng on 2016/9/19.
 */
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("screenshots_gallary")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../image/full_size_1.jpg");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("screenshots_gallary");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function showPicture(whichPicture) {
    var source = whichPicture.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (whichPicture.getAttribute("title")){
        var text = whichPicture.getAttribute("title");
    }else{
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType === 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function prepareScreenshots() {
    var screenshots = document.getElementById("screenshots_gallary");
    var links = screenshots.getElementsByTagName("a");
    for (var i = 0; i <links.length; i++){
        links[i].onclick = function () {
            return showPicture(this);
        }
    }
}

addLoadFunction(preparePlaceholder());
addLoadFunction(prepareScreenshots());