const BASE_URL = "https://dummyjson.com";

async function getData() {
    const content = document.querySelector(".content");
    const query = new URLSearchParams(window.location.search);
    const id = query.get("q");

    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        createContent(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        content.innerHTML = `<p>Failed to load product data. Please try again later.</p>`;
    }
}

function createContent(data) {
    const contentImage = document.querySelector(".content-image img");
    const contentDetails = document.querySelector(".content-details");

    contentImage.src = data.images[0];
    contentImage.alt = data.title;

    contentDetails.innerHTML = `
        <h1>${data.title}</h1>
        <h2>${data.price} USD</h2>
        <p>${data.description}</p>
    `;
}

getData();
