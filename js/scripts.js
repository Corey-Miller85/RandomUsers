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

fetchData().then(data => createCards(data)).then(createModal).then(addSearchBar);



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
        `;
        checkVisible();

        //event listener checking for clicks on card
        cardDiv.addEventListener('click', (event) => {
            checkVisible();
            const target = event.target
            if (target.className != "card") {
                if (target.parentNode.className == "card") {
                    let name = target.parentNode.querySelector('#name').textContent;
                    findName(name)
                    populateModal(currentIndex);
                } else {
                    let name = target.parentNode.parentNode.querySelector('#name').textContent;
                    findName(name)
                    populateModal(currentIndex);
                }
            } else {
                let name = target.querySelector('#name').textContent;
                findName(name)
                populateModal(currentIndex);
            }
        });
    });
}


//loops though card divs to and checks for hidden, if not hidden assign to visible cards variable
function checkVisible() {
    visibleCards = []
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (!card.classList.value.includes('hidden')){
            visibleCards.push(card);
        }
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
function populateModal(visiableIndex) {
    // Get name value with the index value from visible people array    
    const visablePeopleName = visibleCards[visiableIndex].querySelector("#name").textContent;
   //search jsonData for matching person 
    jsonData.forEach((person, index) => {
        jsonDataName = person.name.first + " " + person.name.last
        if (visablePeopleName === jsonDataName) {
                const modalDiv = document.querySelector('.modal-container')
                //slices data to adhere to styling
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
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}., ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${dobMonth}/${dobDay}/${dobYear}</p>
                </div>
                </div>
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
                 `;
            modalDiv.style.display = ""
            document.querySelector('#modal-prev').addEventListener('click', (e) => {
                if (currentIndex > 0) {
                    currentIndex -= 1;
                   populateModal(currentIndex);
                } else {
                    currentIndex = visibleCards.length - 1;
                    populateModal(currentIndex)
                }
                
            });
            document.querySelector('#modal-next').addEventListener('click', (e) => {
                if (currentIndex < visibleCards.length - 1) {
                    currentIndex += 1;
                   populateModal(currentIndex);
                } else {
                    currentIndex = 0
                    populateModal(currentIndex);
                }
            });

        }
    });
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
                ele.classList.remove('hidden')
                checkVisible();
            } else {
                ele.style.display = 'none'
                ele.classList.add('hidden');
                checkVisible();
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
/**
 * 
 * @param {string} personName Searches for index of persons name in visiableCards array and sets current index to their
 */
function findName(personName) {
    visibleCards.forEach((person,index) => {
        const visiableListName = person.querySelector('#name').textContent;
        if (personName === visiableListName) {
            currentIndex = index;
        }
    });
}