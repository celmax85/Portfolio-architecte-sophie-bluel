let login = document.getElementById("login_out");

function updateLogin() {
    if (localStorage.token) {
        login.innerHTML = `<a href="index.html" onclick="logout()">logout</a>`;
    } else {
        login.innerHTML = `<a href="login.html">login</a>`;
    }
}

function logout() {
    localStorage.clear();
    updateLogin();
}


updateLogin();


