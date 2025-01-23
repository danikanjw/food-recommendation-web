let cardContainer = document.querySelector('.card-container');

async function fetchDataByCategory(categoryName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();

        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }
        data.meals.forEach(meal => {
            let card = document.createElement('div');
            card.className = 'card m-2';
            card.innerHTML = `
                <img src="${meal.strMealThumb}" class="card-img-top" style="aspect-ratio: 3 / 4; object-fit: contain">
                <div class="card-body">
                    <p class="card-text text-center text-dark">${meal.strMeal}</p>
                </div>`;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

document.querySelectorAll('.filters').forEach(item => {
    item.addEventListener('click', event => {
        let categoryName = event.target.getAttribute('data-filter');
        fetchDataByCategory(categoryName);
    });
});

let rekomendasiAcak = document.querySelector('.rekomendasi');

async function fetchRandomData() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        let meal = data.meals[0];
        let card = document.createElement('div');
        card.className = 'card m-2';
        card.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" style="aspect-ratio: 3 / 4; object-fit: contain">
            <div class="card-body">
                <p class="card-text text-center text-dark">${meal.strMeal}</p>
            </div>`;

            while (rekomendasiAcak.firstChild) {
                rekomendasiAcak.removeChild(rekomendasiAcak.firstChild);
            }
            
        rekomendasiAcak.appendChild(card);
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

fetchRandomData();

function scrollToKategori() {
    var element = document.getElementById("kategori");
    var to = element.offsetTop;
    window.scroll({top: to, behavior: 'smooth'});
}

document.getElementById('randomButton').addEventListener('click', fetchRandomData);