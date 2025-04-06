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




var activeButton = document.getElementById("das");

// showing content 
function show(button, section) {
    document.querySelectorAll(".tabs").forEach(tab => {
        tab.classList.add("hidden");
    });
    document.getElementById(section).classList.remove("hidden");
    if (activeButton) {
        activeButton.classList.remove("bg-purple-800");
        activeButton.classList.add("hover:bg-purple-500");
    }

    button.classList.add("bg-purple-800");
    button.classList.remove("hover:bg-purple-500");
    activeButton = button;
}
//on forward or previous
// window.addEventListener("hashchange", function () {
//     let section = window.location.hash.substring(1) || 'dashboard';
//     const buttonId = section.substr(0, 3);
//     const defaultButton = document.getElementById(buttonId);
//     show(defaultButton, section);
// });

//on click 
function goToSection(button, section) {
    localStorage.setItem("data", JSON.stringify(section));
    window.location.hash = section;
    show(button, section);

}

//on reload
document.addEventListener("DOMContentLoaded", function () {
    const section = JSON.parse(localStorage.getItem("data")) || "dashboard";
    let buttonId = section.substr(0, 3);
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
            

        }).catch(error => { console.log(error) });
}


// Delete product from cart

async function Delete(productId) {
   
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
          
            element.remove();
        }).catch(error => {
            console.log("error during deletion");

        })
}

//select category
buttons = document.querySelectorAll(".category-btn");
products = document.querySelectorAll(".product-card");
// function showCategory(Category) {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selected = btn.getAttribute("data-category");
            
            products.forEach(prod => {
                if (prod.getAttribute("data-category") == selected) {

                    prod.classList.remove("hidden");
                } else {
                    
                    prod.classList.add("hidden");
                }
            })
        })

    })
// }


