const api = "https://dev.digithings.io/wp-api/wp-json/wc/v3/products";
const params = new URLSearchParams({
    consumer_key: "ck_70d95adcb2274b06188009375dc41c42fd241a73",
    consumer_secret: "cs_9fb15a5565510f5e4e1908255c4744829c872668",
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const productContainer = document.querySelector(".product-container");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading product...";
productContainer.appendChild(loadingIndicator);

fetch(`${api}/${productId}?${params.toString()}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Sorry, there was an error loading the API");
        }
    })
    .then(product => {
        productContainer.removeChild(loadingIndicator);

        const item = document.createElement("div");
        item.classList.add("container", "product", "v-pad-2");

        const itemImg = document.createElement("div");
        itemImg.classList.add("product-image");
        item.appendChild(itemImg);

        const image = document.createElement("img");
        image.src = product.images[0].src;
        image.alt = product.name;
        itemImg.appendChild(image);

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");
        item.appendChild(productInfo);

        const productName = document.createElement("h1");
        productName.textContent = product.name;
        productInfo.appendChild(productName);

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productInfo.appendChild(productPrice);

        const itemDescription = document.createElement("div");
        itemDescription.classList.add("container", "product-description", "v-pad-4");
        item.appendChild(itemDescription);

        const descriptionContent = document.createElement("div");
        descriptionContent.innerHTML = product.description;
        itemDescription.appendChild(descriptionContent);

        productContainer.appendChild(item);
    })
    .catch(error => {
        productContainer.removeChild(loadingIndicator);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred: Could not load product";
        productContainer.appendChild(errorMessage);
    });
