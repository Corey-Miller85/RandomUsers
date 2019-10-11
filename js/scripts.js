const gallery = document.getElementById('gallery');


async function fetchData() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const person = data.results[0];
    gallery.innerHTML = `<img src="${person.picture.thumbnail}"> <span> ${person.name.first} ${person.name.last} </span>`;
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

