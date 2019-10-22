const gallery = document.getElementById('gallery');
let visibleCards = [];
let currentIndex = 0;
let jsonData;

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?nat=us&results=12');
    const data = await res.json()
    jsonData = data.results
    return data.results;
}

fetchData().then(data => createCards(data)).then(createModal);



function createCards(data) {
    data.forEach((person, index)=> {
        const cardDiv = document.createElement('div');
        cardDiv.className = "card";
        gallery.appendChild(cardDiv);
        
        //populate the card with each persons info
        cardDiv.innerHTML = `
        <div class="card-img-container">
                        <img class="card-img" src="${person.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
        `

        //event listener checking for clicks on card
        cardDiv.addEventListener('click', (event) => {
            checkVisible();
            const target = event.target
            if (target.parentNode.className === "card") {
                let name = target.parentNode.querySelector('#name').textContent;
                visibleCards.forEach( (person, index) =>  {
                    if (person.querySelector('#name').textContent === name) {
                        currentIndex = index
                        populateModal(name)
                    }
                })
            }
            else {
                let name = target.parentNode.parentNode.querySelector('#name').textContent;
                visibleCards.forEach( (person, index) =>  {
                    if (person.querySelector('#name').textContent === name) {
                        currentIndex = index
                        populateModal(name)
                    }
                })
            }
        });
    });
}


//loops though card divs to and checks for hidden, if not hidden assign to visible cards variable
function checkVisible() {
    visibleCards = []
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        visibleCards.push(card);
    })
}

//create modal div, then hide it.
function createModal() {
    const body = document.querySelector('body');
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
    
    body.appendChild(modalDiv);
    modalDiv.style.display = 'none';

    modalDiv.addEventListener('click', (e) => {
        const target = e.target
        //checks to see if the click was registered on the X button.
        if (target.id === 'modal-close-btn' || target.innerHTML === "X") {
            const moduleContainer = document.querySelector('.modal-container');
            moduleContainer.style.display = 'none';
        }
    });
}
    
    
/**
 * takes in index number and finds matching index from visiable people array for populating modal
 * @param {number} indexNumber 
 */
function populateModal(name) {
    jsonData.forEach((person, index ) => {
        const matchName = person.name.first + " " + person.name.last;
        if (matchName == name) {
            const modalDiv = document.querySelector('.modal-container')
            const dob = person.dob.date
            const dobMonth = dob.slice(5,7);
            const dobDay = dob.slice(8,10);
            const dobYear = dob.slice(0,4);
        modalDiv.innerHTML = `
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <img class="modal-img" src="${person.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: ${dobMonth}/${dobDay}/${dobYear}</p>
            </div>
             `;
        modalDiv.style.display = ""
        }
    });
}



// if (index == indexNumber) {
    //     const modalDiv = document.querySelector('.modal-container')
    //     modalDiv.innerHTML = `
    //         <div class="modal">
    //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //         <div class="modal-info-container">
    //         <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
    //         <h3 id="name" class="modal-name cap">name</h3>
    //         <p class="modal-text">email</p>
    //         <p class="modal-text cap">city</p>
    //         <hr>
    //         <p class="modal-text">(555) 555-5555</p>
    //         <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    //         <p class="modal-text">Birthday: 10/21/2015</p>
    //         </div>
    //          `;
    //     modalDiv.style.display = ""
    // }