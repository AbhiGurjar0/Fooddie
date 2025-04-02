// let register = document.getElementById("register");
// let login = document.getElementById("login");
// let border = document.getElementById("border");
// let signin = document.getElementById("signin");
// let signup = document.getElementById("signup");

// signup.addEventListener("click", () => {
//     register.style.display = "flex";
//     border.style.left = "10px";
//     login.style.display = "none";
// });
// signin.addEventListener("click", () => {
//     login.style.display = "flex";
//     border.style.left = "180px";
//     register.style.display = "none";
// })

//main section nevigation
// let tabs = document.querySelectorAll(".tabs");


var activeButton = document.getElementById("das");

// showing content 
function show(button, section) {
    document.querySelectorAll(".tabs").forEach(tab => {
        tab.classList.add("hidden");
    });
    document.getElementById(section).classList.remove("hidden");
    if (activeButton) {
        activeButton.classList.remove("bg-[#F8B602]");
        activeButton.classList.add("hover:bg-gray-200");
    }

    button.classList.add("bg-[#F8B602]");
    button.classList.remove("hover:bg-gray-200");
    activeButton = button;
}
//on forward or previous
window.addEventListener("hashchange", function () {
    let section = window.location.hash.substring(1) || 'dashboard';
    const buttonId = section.substr(0, 3);
    const defaultButton = document.getElementById(buttonId);
    show(defaultButton, section);
});

//on click 
function goToSection(button, section) {
    localStorage.setItem("activeSection", button.getAttribute("id"));
    window.location.hash = section;
    show(button, section);

}

//on reload
document.addEventListener("DOMContentLoaded", function () {
    const section = window.location.hash.substring(1) || "default-section"; // Default to a section if no hash
    const buttonId = localStorage.getItem("activeSection");
    const defaultButton = document.getElementById(buttonId);
    show(defaultButton, section); // Pass the button and section to the show function
});


//Add to cart 

async function addToCart(productId) {

    await fetch("/home/cart", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ productId: productId }),

    })
        .then(response => response.json())
        .then(data => {
             console.log(data)

        }).catch(error => { console.log(error) });
}


// Delete product from cart

async function Delete(productId) {
    console.log("called");
    const element = document.querySelector(`[data-product-id="${productId}"]`);
    await fetch("home/cart/delete", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ productId: productId })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            element.remove();
        }).catch(error => {
            console.log("error during deletion");

        })


}

