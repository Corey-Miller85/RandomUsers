const gallery = document.getElementById('gallery');


async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?results=50');
    const data = await res.json();
    data.results.forEach((person) => {
        let html = "" 
        html += `<p><img src="${person.picture.thumbnail}"> ${person.name.first} ${person.name.last} </p>`
        gallery.innerHTML += html;
        });
    
    
    // const person = await data.results;

    // gallery.innerHTML = `<img src="${person.picture.thumbnail}"> <span> ${person.name.first} ${person.name.last} </span>`;
}

fetchData();


// .then(res => res.json())
            // .then(data => {
            //     console.log(data)
            //     return data
            // })
            // .then(data => {
            //     const person = data.results[0];
            //     gallery.innerHTML = `<img src="${person.picture.thumbnail}"> <span> ${person.name.first} ${person.name.last} </span>`;
            // })
            // .catch(error => Error(console.log("There was an error")));

