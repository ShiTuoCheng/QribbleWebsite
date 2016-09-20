/**
 * Created by shituocheng on 2016/9/19.
 */
function focusLabels() {
    var labels = document.getElementsByTagName("label");
    for(var i=0; i<labels.length; i++){
        labels[i].onclick = function () {
            var elem = document.getElementById("id");
            elem.focus();
        }
    }
}

function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}


// Ajax

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) {}
            return false;
        }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    // Remove the existing content.
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    //  Create a loading image.
    var content = document.createElement("img");
    content.setAttribute("src","../image/loading.gif");
    content.setAttribute("alt","Loading...");
    // Append the loading element.
    element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {

    var request = getHTTPObject();
    if (!request) { return false; }

    // Display a loading message.
    displayAjaxLoading(thetarget);

    // Collect the data.
    var dataParts = [];
    var element;
    for (var i=0; i<whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join('&');

    request.open('POST', whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };

    request.send(data);

    return true;
};

window.onload = function () {
    focusLabels();
    prepareForms();
}