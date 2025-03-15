let register = document.getElementById("register");
let login = document.getElementById("login");
let border = document.getElementById("border");
let signin = document.getElementById("signin");
let signup = document.getElementById("signup");

signup.addEventListener("click", () => {
    register.style.display = "flex";
    border.style.left = "10px";
    login.style.display = "none";
});
signin.addEventListener("click", () => {
    login.style.display = "flex";
    border.style.left = "180px";
    register.style.display = "none";
});