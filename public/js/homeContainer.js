onload = function () {
    // Code for the nav bar to go up when scrolling down
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

    // Category link handling
    let categoryLinks = document.querySelectorAll(".forSessionStorage");
    for (let i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].addEventListener("click", function () {
            let category = categoryLinks[i].getAttribute("data-category");
            sessionStorage.setItem("selectedCategory", category);
            // Clear selected product when changing categories
            sessionStorage.removeItem("selectedProduct");
        });
    }
}