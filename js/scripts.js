const gallery = document.getElementById('gallery');


async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?results=12');
    const data = await res.json();
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
}

document.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target.id);
    if (target.id != "gallery" && document.querySelector('.modal-container') == null) {
        createModuleContainer()
    }
    if (target.id === 'modal-close-btn' || target.innerHTML === "X") {
        const moduleContainer = document.querySelector('.modal-container');
        gallery.removeChild(moduleContainer);
    }
    
})

