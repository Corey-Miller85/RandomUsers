const gallery = document.getElementById('gallery');
let jsonData;
let peopleArray = []
let currentIndex = 0;

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?nat=us&results=12');
    const data = await res.json();
    jsonData = data.results;
    return data
};

fetchData()
    .then(data => createCard(data))
    .then(data => buildPeopleArray(data))
    .then(addSearchBar())
    .then(createModal());


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

        //popular and show modal window for selected person.
        card.addEventListener ('click', (event) => {
            const personName = `${person.name.first} ${person.name.last}`
            currentIndex = index
            
            populateModal(currentIndex);
            document.querySelector(".modal-container").style.display = 'block';
        });
    });
    return data
}


function createModal() {
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');
    document.querySelector('body').appendChild(modalDiv)
    const createDiv = document.createElement('div');
    createDiv.classList.add('modal')
    modalDiv.appendChild(createDiv);
    modalDiv.style.display = "none";
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('modal-btn-container');
    modalDiv.appendChild(btnContainer);
    btnContainer.innerHTML= ` 
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `
    
    modalDiv.addEventListener('click', (e) => {
        console.log(e.target)
        if (e.target.className === 'modal-close-btn' || e.target.innerHTML === "X") {
            modalDiv.style.display = 'none'
        }
        if (e.target.id === 'modal-prev' && currentIndex > card) {
            currentIndex -= 1;
            populateModal(currentIndex)
        }
        if (e.target.id === 'modal-next' && currentIndex < 12 ){
            currentIndex += 1;
            populateModal((currentIndex))
        }
        
        
    });
}


async function populateModal(index) { 
    let person = jsonData[index];
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

// Search Bar code //
function addSearchBar(){
    const searchForm = document.createElement('form');
    searchForm.action = "#";
    searchForm.method = "GET";
    searchForm.innerHTML = `
        <input type="search" id = "search-input" class="search-input" placeholder = "Search..." >
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
            `;
    document.querySelector('.search-container').appendChild(searchForm);
    const search = document.querySelector('#search-input')
    
    
    //search through all cards on keyup 
    searchForm.addEventListener('keyup', (e) => {
        let card = document.querySelectorAll('.card');
        card.forEach((ele, index) => {
            const name = ele.querySelector('.card-name').textContent.toLowerCase();
            const email = ele.querySelector('p.card-text').textContent.toLowerCase();
            const location = ele.querySelector('p.cap').textContent.toLowerCase();
            // search through cards name, emails, and locations  element and match with search results
            if (name.includes(search.value.toLowerCase()) || email.includes(search.value.toLowerCase()) || location.includes(search.value.toLowerCase())) {
                ele.style.display = 'flex'
            } else {
                ele.style.display = 'none'
            }
        })
    });  

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let card = document.querySelectorAll('.card');
        card.forEach((ele, index) => {
            const name = ele.querySelector('.card-name').textContent.toLowerCase();
            const email = ele.querySelector('p.card-text').textContent.toLowerCase();
            const location = ele.querySelector('p.cap').textContent.toLowerCase();
            // search through cards name, emails, and locations  element and match with search results
            if (name.includes(search.value.toLowerCase()) || email.includes(search.value.toLowerCase()) || location.includes(search.value.toLowerCase())) {
                ele.style.display = 'flex'
            } else {
                ele.style.display = 'none'
            }
        });
        
    })
}

function buildPeopleArray(jsonData) {
    jsonData.results.forEach((object, index) => {
       peopleArray.push(object);
    });
    return peopleArray;
}





