const wrapper = document.querySelector(".wrapper");
const loading = document.querySelector(".loading");
const btn = document.querySelector(".btn");
const category = document.querySelector(".category");

const BASE_URL = "https://dummyjson.com";

let limitCount = 5;
let offset = 1;

async function getData(endpoint, count) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}?limit=${limitCount * count}`);
        const data = await response.json();
        createProduct(data);
    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        loading.style.display = "none";
    }
}

getData("products", offset);

function createProduct(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }
    data.products.forEach((product) => {
        const card = document.createElement("div");
        card.dataset.id = product.id
        card.className = "card";
        card.innerHTML = `
            <img src="${product.images[0]}" class="card__img" alt="${product.title}">
            <h3>${product.title}</h3>
            <strong>$${product.price}</strong>
            <button>Buy now</button>
        `;
        wrapper.appendChild(card);
    });
}

btn.addEventListener("click", () => {
    offset++;
    getData("products", offset);
});

async function getCategory(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        const data = await response.json();
        createCategory(data);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

getCategory("products/category-list");

function createCategory(data) {
    const category = document.querySelector(".category");
    data.forEach((item) => {
        const liEL = document.createElement("li");
        const dataEl = document.createElement("data");
        liEL.className = "category__item";

        dataEl.innerHTML = item;
        dataEl.setAttribute("value", `/category/${item}`);

        dataEl.addEventListener("click", (e) => {
            getData(`products${e.target.getAttribute("value")}`, offset);
        });

        liEL.appendChild(dataEl);
        category.appendChild(liEL);
    });
}
    
wrapper.addEventListener("click",(event)=>{
    if (event.target.className === "card__img") {
        let id = event.target.closest(".card").dataset.id
        open(`/pages/product.html?q=${id}`, "_self")
    }else{
        console.log("not detail");
        
    }

})