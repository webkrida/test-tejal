import { categoryData } from "./category-data.js";

onload = function () {
    // Get the URL parameter for category, default to "women" if not provided
    let selectedCategory = sessionStorage.getItem('selectedCategory') || 'women'; // Default to "women"
    let radioButtons = document.querySelectorAll('input[name="productCategory"]');
    let productSection = document.querySelector('#productSection'); // Common section for all products

    // Set the selected category in the radio buttons
    document.querySelector(`input[name="productCategory"][value="${selectedCategory}"]`).checked = true;

    // Initialize radio buttons
    selectCategory(radioButtons, productSection, categoryData);

    // Called in onload for the purpose of displaying the default category
    productSection.innerHTML = displayProducts(selectedCategory, categoryData);

    // Use event delegation for product clicks
    productSection.addEventListener("click", function (e) {
        const productElement = e.target.closest(".allProducts");
        if (productElement) {
            const productId = productElement.getAttribute("data-product-id");
            sessionStorage.setItem("selectedProduct", productId);
        }
    });

    // Code for the nav bar to go up when scrolling down
    let lastScrollTop = 0;
    let bigScreenHeader = document.querySelector(".big-screen-header");
    let mobileViewHeader = document.querySelector(".mobile-view-header");
    let headers = [bigScreenHeader, mobileViewHeader];

    window.addEventListener("scroll", () => {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScrollTop > lastScrollTop) {
            // Scrolling down
            headers.forEach(header => header.style.transform = "translateY(-100%)");
        } else {
            // Scrolling up
            headers.forEach(header => header.style.transform = "translateY(0)");
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
};

// to show selected categary products
function selectCategory(radioButtons, productSection, categoryData) {
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('click', function () {
            let selectedCategory = this.value;
            sessionStorage.setItem("selectedCategory", selectedCategory);
            productSection.innerHTML = displayProducts(selectedCategory, categoryData);
        });
    });
}

// product display by categaries
function displayProducts(selectedCategory, categoryData) {
    // Filter products for the selected category
    let products = categoryData.products[selectedCategory];

    if (!products || products.length === 0) {
        return `<p>No products available in this category.</p>`;
    }

    let productElement = "";
    productElement += `<div class="col-md-12"><h2 class="mb-4 mt-0 text-uppercase text-center fw-bold">${selectedCategory}'s Collection</h2></div>`;

    products.forEach(product => {
        productElement += `
            <div class="col-md-3 mb-5 allProducts" data-product-id="${product.id}">
                <a href="/products" class="box text-decoration-none text-black">
                    <div class="image-sizer mb-3">                        
                        <img class="image" src="${product.images[0]}" alt="${product.title}" loading="lazy">
                    </div>
                    <section class="w-50 float-start">
                        <span class="mb-0 fs-19 fw-bold">New! <br/></span>
                        <span class="fs-19"><b>${product.title}</b></span>
                    </section>
                    <section class="float-end">
                        <span class="text-end fs-19">Rs. ${product.price}</span>
                    </section>
                </a>
            </div>
        `;
    });

    return productElement;
}