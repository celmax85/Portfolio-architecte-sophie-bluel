let login = document.getElementById("login_out");



document.querySelector('form input[type="submit"]').addEventListener('click', async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        email: email,
        password: password
    }
    
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    fetch('https://sophiebluel.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(async (response) => {
        if (response.status == 200) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            window.location = "index.html";
        }
        else if (response.status == 404) {
            const errorData = await response.json();
            document.getElementById("email-error").textContent = "Identifiant incorrect";
        }
        else if (response.status == 401) {
            const errorData = await response.json();
            document.getElementById("password-error").textContent = "Mot de passe incorrect";
        }
        else {
            throw Error(response.statusText);
        }
    })
    .catch((err) => {
        console.error("Erreur :", err);
    });
});