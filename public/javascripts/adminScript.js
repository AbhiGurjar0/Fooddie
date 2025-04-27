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


//Edit status
const openPopup = document.querySelector('.openPopup');
const closePopup = document.querySelector('.closePopup');
const popup = document.querySelector('.popup');


openPopup.addEventListener('click', () => {
    popup.classList.remove('hidden');
});

closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});







