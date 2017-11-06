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



const userInteract = (status) => {
    console.log('User interact method invoked..');
    if (!status) {
        $("#userInteractOverlay").removeClass('hide');
    } else {
        $("#userInteractOverlay").addClass('hide');
    }
}