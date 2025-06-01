const auth = firebase.auth();

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email,password)     
     .then(() => {
        window.location.href = "index.html";
    })
     .catch(error =>{
        document.getElementById("msg").innerText = error.message;
    });
}

function register(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email,password)
    .then(() => {
        document.getElementById('msg').innerText = "Welcome There You are now an Official Bleach Member, You can Log in now!";
    })
    .catch(error => {
        document.getElementById('msg').innerText = error.message;
    });
}