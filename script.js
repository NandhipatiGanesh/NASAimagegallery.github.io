document.addEventListener("DOMContentLoaded", async function () {
    const searchBar = document.getElementById("searchbar");
    const imageGrid = document.getElementById("imageGrid");

    async function fetchImages(query) {
        try {
            const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data.collection.items;
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }

    function displayImages(images) {
        imageGrid.innerHTML = '';
        images.forEach(item => {
            const imageURL = item.links[0].href;
            const title = item.data[0].title;

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.innerHTML = `<img src="${imageURL}" alt="${title}">`;
            thumbnail.addEventListener('click', () => {
                alert(`You clicked on the image "${title}"`);
            });
            imageGrid.appendChild(thumbnail);
        });
    }

    searchBar.addEventListener("input", async () => {
        const query = searchBar.value.trim();
        if (query !== '') {
            const images = await fetchImages(query);
            displayImages(images);
        } else {
            imageGrid.innerHTML = '';
        }
    });
});