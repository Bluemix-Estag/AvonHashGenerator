unction createXHR(){
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else{
		try{
			return new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				return new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){}
		}
	}
	return null;
}
function xhrGet(url, callback, errback){
	var xhr = new createXHR();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				callback(JSON.parse(xhr.responseText));
			}else{
				errback(JSON.parse(xhr.responseText));
			}
		}
	};
	
	xhr.timeout = 100000;
	xhr.ontimeout = errback;
	xhr.send();
}



function xhrPost(url, data, callback, errback){
	var xhr = new createXHR();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				callback(parseJson(xhr.responseText));
			}else{
				errback(parseJson(xhr.responseText));
			}
		}
	};
	xhr.timeout = 100000;
	xhr.ontimeout = errback;
	xhr.send(JSON.stringify(data));
}

function parseJson(str){
	return window.JSON ? JSON.parse(str) : eval('(' + str + ')');
}


const showLoadingInElement = (id) => {
    let loader = '<div class="preloader-wrapper small active">' +
        '<div class="spinner-layer spinner-blue-only">' +
        '<div class="circle-clipper left">' +
        '<div class="circle"></div>' +
        '</div><div class="gap-patch">' +
        '<div class="circle"></div>' +
        '</div><div class="circle-clipper right">' +
        '<div class="circle"></div>' +
        '</div></div></div>';
    $("#" + id).html(loader);
}

const removeLoadingInElement = (id, insideText) => {
    $("#" + id).html(insideText);
}

let timer = null;
const showAlert = (message, type) => {
    if (timer != null)
        clearTimeout(timer);
    $("#alertBox").removeClass("hide");
    let painel_message = $("#alertBox").children()[1];
    painel_message.innerHTML = getMessage(message);
    let colorClass = '';
    switch (type) {
        case "error":
            colorClass = 'red accent-2';
            break;
        case "success":
            colorClass = 'green accent-4';
            break;
    }
    $(painel_message).addClass(colorClass);
    timer = setTimeout(() => {
        $("#alertBox").addClass('hide');
        $(painel_message).removeClass(colorClass);
    }, 3000);

}

const getMessage = (message) => {
    switch (message) {
        case "USER_NOT_FOUND":
            return "Email not found, check it please.";
            break;
        case "WRONG_PASSWORD":
            return "Wrong password."
            break;
        case undefined:
            return "An error ocurred, try again.";
            break;
        default:
            return message;
            break;
    }
}


const userInteract = (status) => {
    console.log('User interact method invoked..');
    if (!status) {
        $("#userInteractOverlay").removeClass('hide');
    } else {
        $("#userInteractOverlay").addClass('hide');
    }
}