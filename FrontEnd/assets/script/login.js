let login = document.getElementById("login_out");



document.querySelector('form input[type="submit"]').addEventListener('click', async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        email: email,
        password: password
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
            else if (response.status == 404) {
                alert("Erreur dans l'identifiant ou le mot de passe");
            }
            else {
                throw Error(response.statusText)
            }
        })
        .then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            window.location = "index.html";
        })
        .catch((err) => {
            console.error("Erreur");
        });
}
);