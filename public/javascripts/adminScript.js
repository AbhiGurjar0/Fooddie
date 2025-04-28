function showContent(section, content) {
    let contents = document.querySelectorAll(".tabs");
    contents.forEach((content) => {
        content.classList.add('hidden');

    })
    document.getElementById(`${content}`).classList.remove('hidden');
    // section.classList.add("bg-black");
}


function show(section, content) {
    let contents = document.querySelectorAll(".detail");
    contents.forEach((content) => {
        content.classList.add('hidden');

    })
    document.getElementById(`${content}`).classList.remove('hidden');
    // section.classList.add("bg-black");
}


const closePopup = document.getElementById("closePopup");
const popup = document.getElementById('popup');
let currentProductId = null; // Will store the current productId globally

function openPopup(productId) {
    console.log("Opening popup for product:", productId);
    currentProductId = productId; // Save productId
    popup.classList.remove('hidden');
}

// This will be called when user clicks a status button
function stat(status) {
    console.log("Sending to backend:", { productId: currentProductId, status: status });
    let productId = currentProductId;
    // Now send it to backend
    fetch('/updateStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: currentProductId,
            status: status
        })
    })
        .then(response => {
            console.log(productId);
            document.getElementById(`${productId}`).innerText = `${status}`;
            popup.classList.add('hidden');
            response.json()
        })
        .then(data => {
            console.log('Success:', data);
            // You can also close the popup or refresh page her
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});






// Delete Product

function deleteItem(productId) {
    fetch("/deleteItem", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({ productId }),
    })
    document.getElementById(`${productId}`).remove();

}

//delete User

function deleteUser(userId) {
    fetch("/deleteUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    document.getElementById(`${userId}`).remove();

}










