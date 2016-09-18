/**
 * Created by shituocheng on 2016/9/18.
 */
function highlightPage() {
    var links = document.getElementsByTagName("a");
    var linkurl;
    for(var i=0; i<links.length; i++){
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl)!= -1){
            links[i].className = "here";
        }
    }
}

addLoadFunction(highlightPage());