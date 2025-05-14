document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const popup = document.querySelector(".pop-up-text");
            if (entry.isIntersecting) {
                popup.classList.add("visible");
            } else {
                popup.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.2,
    });

    const indexP2 = document.querySelector(".index-p2");
    if (indexP2) observer.observe(indexP2);
});
