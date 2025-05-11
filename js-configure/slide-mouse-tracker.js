const spotLight = document.querySelector(".slide-list");

spotLight.addEventListener("mousemove", (e)=>{
    const rect=spotLight.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotLight.style.setProperty("--x", `${x}px`);
    spotLight.style.setProperty("--y", `${y}px`);
    spotLight.style.setProperty("--opacity", 1);

    spotLight.addEventListener("mouseleave", (e)=>{
        spotLight.style.setProperty("--opacity", 0);
    })

})