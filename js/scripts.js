const gallery = document.getElementById('gallery');
let jsonData;

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?results=12');
    const data = await res.json();
    jsonData = data.results;
    return data
};


function createCard(data) {
    data.results.forEach((person) => {
        const card = document.createElement('div');
        const cardImg = document.createElement('div');
        const cardInfo = document.createElement('div');
        card.className = ('card');
        cardImg.className = ('card-img-container');
        cardInfo.className = ('card-info-container');
        gallery.appendChild(card);
        card.appendChild(cardImg);
        card.appendChild(cardInfo);
        console.log(person)
        cardImg.innerHTML = `
        <img class="card-img" src="${person.picture.large}" alt="profile picture">
        `
        cardInfo.innerHTML = `
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        `
    }
)};

fetchData().then(data => createCard(data));

function createModuleContainer() {
    const moduleContainer = document.createElement('div')
    moduleContainer.className = 'modal-container'
    gallery.appendChild(moduleContainer);
    const moduleDiv = document.createElement('div')
    moduleDiv.className = "modal"
    moduleContainer.appendChild(moduleDiv);
    const moduleButton = document.createElement('button')
    moduleButton.type = "button";
    moduleButton.id = "modal-close-btn";
    moduleButton.className = "modal-close-btn";
    moduleButton.innerHTML = `<strong>X</strong>`;
    moduleDiv.appendChild(moduleButton);
    const modalInfo = document.createElement('div');
    modalInfo.className = "modal-info-container"
    moduleDiv.appendChild(modalInfo);
}

function createModalInfo(name) {
    jsonData.forEach((person) => {
        const firstName = person.name.first;
        const lastName = person.name.last;
        if (name[0] === firstName && name[name.length - 1] === lastName) {
            const infoContainer = document.querySelector('.modal-info-container');
            const dob = person.dob.date.slice(0,10)
            console.log(dob)
            infoContainer.innerHTML =` 
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.phone}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}., ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>


            `
        }
    });
}


document.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target);

    //checks to see if click was in the bounds of the modal container
    if (target.id != "gallery" && document.querySelector('.modal-container') == null) {
        if(event.target.className != "card" ) { 
            let name = target.parentElement.parentElement.querySelector('div #name').innerHTML.split(" "); //backs up to the parent container to let code be dynamic (goes back up to the main container div)
            createModuleContainer()
            createModalInfo(name);
        } else { //adjusts for the value already being in the root container
            let name = target.querySelector('div #name').innerHTML.split(" ");
            createModuleContainer()
            createModalInfo(name);
        }

    }

    //checks to see if the click was registered on the X button.
    if (target.id === 'modal-close-btn' || target.innerHTML === "X") {
        const moduleContainer = document.querySelector('.modal-container');
        gallery.removeChild(moduleContainer);
    }
    
})

