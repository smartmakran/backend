
function login() {
    const phone = $("#login-phone");
    const password = $("#login-password");

    if (password.val() && password.length < 6) {
        password.parent().addClass('has-error')
    }
}


