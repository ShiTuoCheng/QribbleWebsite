/**
 * Created by shituocheng on 2016/9/18.
 */
function addLoadFunction(func) {
    var onOldLoad = window.onload;
    if (typeof window.onload !== "function"){
        window.onload = func;
    }else{
        onOldLoad();
        func();
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className){
        element.className = value;
    }else{
        var newClassName = element.className;
        newClassName += "";
        newClassName += value;
        element.className = newClassName;
    }
}

function moveElement(elementId, final_x, final_y, interval) {
    var elem = document.getElementById(elementId);
    if (!elem.style.left){
        elem.style.left = "0px";
    }
    if (!elem.style.top){
        elem.style.top = "0px";
    }
}