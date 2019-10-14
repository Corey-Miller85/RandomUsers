const gallery = document.getElementById('gallery');
let visibleCards = [];
let currentIndex = 0;

async function fetchData() {
    const res = await fetch('https://randomuser.me/api/?nat=us&results=12');
    const data = await res.json();
    return data
};