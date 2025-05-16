import { categoryData } from "./category-data.js";

onload = function () {
    let selectCategory = sessionStorage.getItem("selectedCategory") || "women";
    let selectedProductId = sessionStorage.getItem("selectedProduct");

    // Get the category products
    let categoryProducts = categoryData.products[selectCategory];

    // Find the selected product or use first product as fallback
    let selectedProduct = categoryProducts.find(product => product.id == selectedProductId);
    if (!selectedProduct && categoryProducts.length > 0) {
        selectedProductId = categoryProducts[0].id;
        sessionStorage.setItem("selectedProduct", selectedProductId);
        selectedProduct = categoryProducts[0];
    }

    if (selectedProduct) {
        document.querySelector("#singleProduct").innerHTML = displaySingleProduct(categoryProducts, selectedProductId);
    } else {
        document.querySelector("#singleProduct").innerHTML = "<p>Product not found. Please select another product.</p>";
    }

    // Navbar scroll behavior
    let lastScrollTop = 0;
    let bigScreenHeader = document.querySelector(".big-screen-header");
    let mobileViewHeader = document.querySelector(".mobile-view-header");
    let headers = [bigScreenHeader, mobileViewHeader];

    window.addEventListener("scroll", () => {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScrollTop > lastScrollTop) {
            headers.forEach(header => header.style.transform = "translateY(-100%)");
        } else {
            headers.forEach(header => header.style.transform = "translateY(0)");
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

    // Image gallery switcher function
    imageGallerySwitcher();

    let decrementBtn = document.querySelector('#decrement');
    let incrementBtn = document.querySelector('#increment');
    let addBtn = document.querySelector('#btnAdd');
    let quantitySpan = document.querySelector('#quantity');

    addBtn.addEventListener('click', function () {
        let allInputFields = document.querySelectorAll(".txtField");
        for (let i = 0; i < allInputFields.length; i++) {
            allInputFields[i].value = "";
            allInputFields[i].placeholder = "";
        }
    });

    decrementBtn.addEventListener('click', function () {
        if (parseInt(quantitySpan.textContent) > 0) {
            quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
        }
        makeBtnEnabledDisabled(addBtn, parseInt(quantitySpan.textContent));
    });

    incrementBtn.addEventListener('click', function () {
        quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        makeBtnEnabledDisabled(addBtn, parseInt(quantitySpan.textContent));
    });

    document.querySelector("#btnSubmit").addEventListener("click", function () {
        //setFocus("firstName");
        let allInputFields = document.querySelectorAll(".txtField");
        for (let i = 0; i < allInputFields.length; i++) {
            let ID = allInputFields[i].getAttribute("id");
            if (!validateTextField(ID)) {
                setFocus(ID);
                showMsg(ID, "Fill the field");
                return false;
            }
        }
        location.href="/";
    });

    let allInputFields = document.querySelectorAll(".txtField");
    for (let i = 0; i < allInputFields.length; i++) {
        allInputFields[i].value = "";
    }
}

function displaySingleProduct(categoryArray, ID) {
    let productInfo = categoryArray.find(product => product.id == ID);

    if (!productInfo) {
        return "<p>Product not found. Please select another product.</p>";
    }

    let productStructure = ``;
    productStructure += `<section class="col-md-6"><section class="row">
                            <section class="col-md-2"><div class="small-box">`;

    for (let p = 0; p < productInfo.images.length; p++) {
        productStructure += `<article><img src="${productInfo.images[p]}" class="active" alt="Image ${p}" /></article>`;
    }

    productStructure += `</div></section>`;
    productStructure += `<section class="col-md-10">
                            <div class="big-box" id="bigBox">
                                <img src="${productInfo.thumbnail}"
                                    alt="Default Image" />
                            </div></section></section></section>`;
    productStructure += `<section class="col-md-6">
                            <section class="ps-3 small-center">
                                <article><button class="component-btn">Components</button></article>
                                <h1 class="my-3 inktrap">${productInfo.title}</h1>
                                <b>
                                    <p><u>Size Chart</u></p>
                                </b>
                                <div class="sizers mb-3">
                                    <div class="radio-group" x-ref="option1">
                                        <div class="size-radio">
                                            <input type="radio" id="size-s" name="size" value="S" checked=""
                                                data-option-position="1">
                                            <label for="size-s" class="label">S</label>
                                        </div>

                                        <div class="size-radio">
                                            <input type="radio" id="size-m" name="size" value="M" data-option-position="1">
                                            <label for="size-m" class="label">M</label>
                                        </div>

                                        <div class="size-radio">
                                            <input type="radio" id="size-l" name="size" value="L" data-option-position="1">
                                            <label for="size-l" class="label">L</label>
                                        </div>

                                        <div class="size-radio">
                                            <input type="radio" id="size-xl" name="size" value="XL" data-option-position="1"
                                                class="add-to-list">
                                            <label for="size-xl" class="label">XL</label>
                                        </div>

                                        <div class="size-radio">
                                            <input type="radio" id="size-2xl" name="size" value="2XL" data-option-position="1">
                                            <label for="size-2xl" class="label">2XL</label>
                                        </div>
                                    </div>
                                </div>
                                <section class="container1">
                                    <button class="increase-decrease-btn" id="decrement"><span><i class="bi bi-dash"></i></span></button>
                                    <span class="mx-3 fw-bold" id="quantity">${productInfo.quantity}</span>
                                    <button class="increase-decrease-btn" id="increment"><span><i class="bi bi-plus"></i></span></button>
                                </section>
                                
                                <button type="button" id="btnAdd" class="add-to-list my-2" data-bs-toggle="modal" data-bs-target="#signUpModal">ADD</button>

                                <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUp" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="signUp">Sign Up</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form action="" id="signUpForm" class="row g-2">
                                                    <section class="col-md-12 my-0">
                                                        <h4>Name</h4>
                                                    </section>
                                                    <section class="col-md-6">
                                                        <input type="text" id="firstName" class="rounded border-dark txtField"><br>
                                                        <label for="firstName">First Name</label>
                                                    </section>
                                                    <section class="col-md-6">
                                                        <input type="text" id="lastName" class="rounded border-dark txtField"><br>
                                                        <label for="lastName">Last Name</label>
                                                    </section>
                                                    <section class="col-md-12">
                                                        <h4><label for="eMail">Email Address</label></h4>
                                                        <input type="text" id="eMail" class="rounded border-dark txtField">
                                                    </section>
                                                    <section class="col-md-12">
                                                        <h4><label for="phnNo">Phone Number</label></h4>
                                                        <input type="text" id="phnNo" class="rounded border-dark txtField">
                                                    </section>
                                                    <section class="col-md-12">
                                                        <h4><label for="address">Address</label></h4>
                                                        <textarea id="address" class="rounded border-dark txtField"></textarea>
                                                    </section>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button id="btnSubmit" class="rounded px-3 py-2">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <article class="fs-5 fw-400 my-3">${productInfo.description}</article>
                                <article class="fs-5 fw-400"><i>100% cotton, unisex sizing, Printed with puff ink on a Comfort Colors tee</i></article>
                            </section>
                        </section>`;

    return productStructure;
}

function makeBtnEnabledDisabled(objBtn, sVal) {
    objBtn.disabled = sVal <= 0;
}

function imageGallerySwitcher() {
    let smallBoxes = document.querySelectorAll('.small-box img');
    let bigBox = document.getElementById('bigBox');

    smallBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            smallBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
            bigBox.innerHTML = `<img src='${box.src}' alt='Selected Image'>`;
        });
    });
}

function validateTextField(inputId) {
    let inputfield = document.querySelector(`#${inputId}`).value;
    return inputfield.trim() !== "";
}

function setFocus(inputId) {
    document.querySelector(`#${inputId}`).focus();
}

function showMsg(msgId, message) {
    document.querySelector(`#${msgId}`).placeholder = message;
}