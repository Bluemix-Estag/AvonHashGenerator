/**
 * @file index page script
 * @author Rabah Zeineddine
 */


$(document).ready(() => {

    $("#loginBtn").click(() => {
        let username = $("#username").val().trim() || null;
        if (username && username != "") {
            let password = $("#password").val().trim() || null;
            if (password && password != "") {
                let accountType = $("#accountTypeSelect").val();
                if (accountType && accountType != "") {
                    let user = {
                        username,
                        password,
                        accountType
                    }

                    showLoadingInElement('loginBtn');
                    userInteract(false);
                    xhrPost('/api/v1/login', user, (result) => {
                        removeLoadingInElement("loginBtn", 'Login');
                        console.log(result);
                        redirectingAlert(result.url);
                    }, (err) => {
                        userInteract(true);
                        removeLoadingInElement("loginBtn", 'Login');
                        showAlert(err.message, 'error');
                    });

                } else {
                    showAlert("Invalid account type!", "error");
                }
            } else {
                showAlert("Invalid Password!", "error");
            }
        } else {
            showAlert("Invalid username!", "error");
        }
    });


    $('select').material_select();

})


const redirectingAlert = (url) => {

    $("#alertBox").removeClass('hide');
    let painel_message = $("#alertBox").children()[1];
    $(painel_message).addClass('green accent-4');
    downCounterMsh(5);
    window.location.href = url;
}




const downCounterMsh = (painel_message, num) => {
    if (num == 0) {
        return 0;
    } else {
        painel_message.innerHTML = 'Redirecting to facebook messenger in ' + num + '..';
        setTimeout(() => {
            downCounterMsh(painel_message, num - 1);
        }, 1000);
    }
}