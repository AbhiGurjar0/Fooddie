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

//Setting section show 

// function userShow(Section, Id) {
//     let content = document.querySelectorAll('.content');
//     content.forEach(con => {
//         con.classList.add("hidden");
//     })
//     document.getElementById(Id).classList.remove("hidden");
// }


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
            let el = document.getElementById("Added");
            el.classList.remove("opacity-0", "scale-95", "pointer-events-none");
            el.classList.add("opacity-100", "scale-100");
            setTimeout(() => {
                el.classList.remove("opacity-100", "scale-100");
                el.classList.add("opacity-0", "scale-95", "pointer-events-none");
            }, 2000);

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

// search 

let input = document.getElementById("INPUT");
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // Call your function here
        searched = input.value.trim().toLowerCase();
        products.forEach(prod => {
            if (prod.getAttribute("data-name").toLowerCase().includes(searched)) {
                prod.classList.remove("hidden");
            }
            else {
                prod.classList.add("hidden");

            }
        })
    }
});

// view all

for (let i = 0; i < products.length; i++) {
    if (i < 3) {
        products[i].classList.remove("hidden");
    }
    else {
        products[i].classList.add("hidden");
    }
}


let viewButton = document.getElementById("view");
viewButton.addEventListener("click", () => {
    products.forEach(prod => {
        prod.classList.remove("hidden");
    })
})







//Sign in 
function signIn() {
    document.getElementById("signin").classList.remove("hidden");
    document.getElementById("signup").classList.add("hidden");
}
//sign Up
function signUp() {
    document.getElementById("signin").classList.add("hidden");
    document.getElementById("signup").classList.remove("hidden");
}


//checkOut

// async function checkout() {
//     await fetch("home/cart/checkOut", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({}),

//     })
//         .then(response => response.json())
//         .then(data => {

//         }).catch(error => {
//             console.log(error);
//         }
//         );
// }

//cancel order
async function deleteProduct(productId) {
    try {
        const element = document.querySelector(`[data-product-id="${productId}"]`);
        const response = await fetch("home/food_orders/cancel/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });

        const contentType = response.headers.get("content-type");

        if (contentType.includes("application/json")) {
            const data = await response.json();
            console.log("JSON Response:", data);
        } else {
            const html = await response.text();
            console.log("HTML Response:", html);
        }
        element.remove();
        let el = document.getElementById("deleted");
        el.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        el.classList.add("opacity-100", "scale-100");
        setTimeout(() => {
            el.classList.remove("opacity-100", "scale-100");
            el.classList.add("opacity-0", "scale-95", "pointer-events-none");
        }, 2000);

        document.getElementById("deleted").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("deleted").classList.add("hidden");
        }, 2000);

    } catch (error) {
        console.error("Delete failed:", error);
    }
}




//Add to favorite
function addToFav(productId, SVG) {
    fetch("addToFav", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    }).then(response => response.json())
        .then(data => {
            //   console.log(SVG)
            if (data == "1") {
                SVG.children[0].setAttribute("fill", "black");
            }
            else {
                SVG.children[0].setAttribute("fill", "red");
            }

        })
        .catch(error => {
            console.log(error);
        })
}




//delete from cart
function deleteItem(productId,index) {
    let item = document.querySelector(`[data-index="${index}"]`);
    console.log(item);
    fetch("/home/cart/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        item.remove();
        console.log("Item deleted:", data);
        // You can update UI here, like removing the item from the DOM
    })
    .catch(err => {
        console.log("Error in deletion ", err);
    });
}
