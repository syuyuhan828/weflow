const ControlSlideListBtns = document.querySelectorAll(".slide-list li");
const controller = document.querySelector(".slide-list");

const slideImages = {
    0: [
        "../img/weflow-news.png"
    ],
    1: [
        "../img/weflow-courses.png"
    ],
    2: [
        "../img/weflow-live-stream.png"
    ],
    3:[
        "../img/weflow-chat.png"
    ],
    4:[
        "../img/weflow-user-analysis.png"
    ]
}


let currentIndex = 0;
let isHovering = false;


const totalTabs = ControlSlideListBtns.length;


// 初始聚光燈位置
moveGlowtoActive();

controller.addEventListener("mouseenter", ()=>{
    isHovering = true;
})

controller.addEventListener("mouseleave", ()=>{
    isHovering=false;
    moveGlowtoActive();
})



// 點擊按鈕時切換 active
ControlSlideListBtns.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        ControlSlideListBtns.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        moveGlowtoActive();
        currentIndex = index;
        renderImagesForTab(index);
        resetTimer(); // 重新設置計時器
    });
});

// 聚光燈移動到當前選中的 li
function moveGlowtoActive() {
    const activeTab = controller.querySelector(".active");
    if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const ctrlRect = controller.getBoundingClientRect();
        const centerX = tabRect.left + tabRect.width / 2 - ctrlRect.left;
        const centerY = tabRect.top + tabRect.height / 2 - ctrlRect.top;
        controller.style.setProperty('--x', `${centerX}px`);
        controller.style.setProperty('--y', `${centerY}px`);
        controller.style.setProperty('--opacity', 1);
    }
}

// 自動切換到下一個 tab
function autoNext() {
    currentIndex = (currentIndex + 1) % totalTabs;
    updateTab(currentIndex);
}

controller.addEventListener("mouseleave", moveGlowtoActive);

function renderImagesForTab(index){
    const imgContainer = document.querySelector(".slide-container");
    imgContainer.innerHTML = "";
    slideImages[index].forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.width = 960;
        img.height = 800;
        img.style.flexShrink = '0';
        imgContainer.appendChild(img);
    });
}

// 更新 tab 和光圈
function updateTab(index) {
    ControlSlideListBtns.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });
    //要監聽使用者是否有把滑鼠放在上面
    
    if (!isHovering) {
        moveGlowtoActive();
    }

    renderImagesForTab(index);
    currentIndex = index;
}

// 設置計時器，自動切換 tab
let timer = setInterval(autoNext, 3000);

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoNext, 3000); // 每 3 秒自動輪播
}


