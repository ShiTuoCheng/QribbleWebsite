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

function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
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

function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.submit = function() {
            return validateForm(thisform);
        }
    }
}

function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.getAttribute('placeholder')) continue;
        element.onfocus = function() {
            if (this.value == this.getAttribute('placeholder')) {
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.value = this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}

/**
 * Ajax setup
 */
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
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "..image/ajax-loading.gif");
    content.setAttribute("alt", "loading");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) return false;
    displayAjaxLoading(thetarget);
}

addLoadFunction(focusLabels());
addLoadFunction(prepareForms());