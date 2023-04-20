const api = "https://dev.digithings.io/wp-api/wp-json/wc/v3/products";
const params = new URLSearchParams({
    consumer_key: "ck_70d95adcb2274b06188009375dc41c42fd241a73",
    consumer_secret: "cs_9fb15a5565510f5e4e1908255c4744829c872668",
});

const shopContainer = document.querySelector(".product-gallery");
const featuredShopContainer = document.querySelector(".favourites-product-gallery");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading");
loadingIndicator.textContent = "Loading products...";
shopContainer.appendChild(loadingIndicator);

fetch(`${api}?${params.toString()}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Sorry, there was an error loading the API");
        }
    })
    .then(data => {
        shopContainer.removeChild(loadingIndicator);

        for (const product of data) {
            const item = document.createElement("div");
            item.classList.add("item");

            const link = document.createElement("a");
            link.href = `product.html?id=${product.id}`;
            link.classList.add("product-link");
            item.appendChild(link);

            const itemImg = document.createElement("div");
            itemImg.classList.add("item-img");
            link.appendChild(itemImg);

            const image = document.createElement("img");
            image.src = product.images[0].src;
            image.alt = product.name;
            itemImg.appendChild(image);

            const productName = document.createElement("h2");
            productName.textContent = product.name;
            link.appendChild(productName);

            const productPrice = document.createElement("p");
            productPrice.textContent = `$${product.price}`;
            link.appendChild(productPrice);
            
            if (product.featured) {
                featuredShopContainer.appendChild(item);
            } else {
                shopContainer.appendChild(item);
            }
        }
    })
    .catch(error => {
        shopContainer.removeChild(loadingIndicator);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred: Could not load products";
        shopContainer.appendChild(errorMessage);
    });