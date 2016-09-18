/**
 * Created by shituocheng on 2016/9/18.
 */
function highlightPage() {
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++){
        var linkurl;
        for(var i=0; i<links.length; i++){
            linkurl = links[i].getAttribute("href");
            if (window.location.href.indexOf(linkurl)!= -1){
                links[i].className = "here";
                var linkstext = links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute("id", linkstext);
            }
        }
    }
}

addLoadFunction(highlightPage());