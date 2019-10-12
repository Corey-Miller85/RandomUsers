const gallery = document.getElementById('gallery');
let jsonData;

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?nat=us&results=12');
    const data = await res.json();
    jsonData = data.results;
    return data
};

fetchData().then(data => createCard(data))

function createCard(data) {
    const gallery = document.querySelector('.gallery');
    const people = data.results;
    people.forEach((person, index) => {
        const name = ``;
        const card = document.createElement('div');
        card.classList.add('card');
        gallery.appendChild(card);
        const image = document.createElement('div');
        image.classList.add('card-img-container');
        image.innerHTML = `<img class="card-img" src="${person.picture.medium}" alt="profile picture">`
        card.appendChild(image);
        const info = document.createElement('div');
        info.classList.add('card-info-container');
        info.innerHTML = `
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        `
        card.appendChild(info);

        card.addEventListener ('click', (event) => {
            if (event.target.parentNode.className != "gallery"){
                document.querySelector(".modal-container").style.display = 'block';
                console.log(event.target.parentNode.querySelector('#name').innerHTML);
            } else {
                document.querySelector(".modal-container").style.display = 'block';
                console.log(event.target.querySelector('#name').innerHTML);

            }
        });


    });
}


function createModal() {
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');
    document.querySelector('body').appendChild(modalDiv)
    const createDiv = document.createElement('div');
    createDiv.classList.add('modal')
    modalDiv.appendChild(createDiv);
    createDiv.innerHTML = `
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    `;
    modalDiv.style.display = "none";

    modalDiv.addEventListener('click', (e) => {
        modalDiv.style.display = "none";
    });
}

createModal();