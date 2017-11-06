$(document).ready(() => {

    $("#loginBtn").click(() => {
        let username = $("#username").val().trim() || null;
        if (username && username != "") {
            let password = $("#password").val().trim() || null;
            if (password && password != "") {

            } else {
                showAlert("Invalid Password!", "error");
            }
        } else {
            showAlert("Invalid username!", "error");
        }
    });

})
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