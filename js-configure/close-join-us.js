document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".close-banner");
    const adContainer = document.querySelector(".join-us-container");

    closeBtn.addEventListener("click", () => {
        adContainer.style.display = "none";
    })

})