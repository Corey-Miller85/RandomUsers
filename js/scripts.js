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
            console.log(event.target.className)
            if (event.target.parentNode.className != "gallery"){
                const personNameParent = event.target.parentNode.querySelector('#name').innerHTML
                populateModal(personNameParent);
                document.querySelector(".modal-container").style.display = 'block';
                
            } else {
                const personNameNoParent = event.target.querySelector('#name').innerHTML;
                populateModal(personNameNoParent);
                document.querySelector(".modal-container").style.display = 'block';
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
    modalDiv.style.display = "none";
    
    modalDiv.addEventListener('click', (e) => {
        modalDiv.style.display = "none";
    });
}

createModal();

function populateModal(name) { 
    jsonData.forEach((person) => {
        if (person.name.first + " " + person.name.last == name) {
            let month = person.dob.date.slice(5, 7);
            let day = person.dob.date.slice(8,10);
            let year = person.dob.date.slice(0,4);
            document.querySelector('.modal').innerHTML = `
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
            `;
        }
    });
}