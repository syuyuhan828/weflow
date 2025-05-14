const ControlSlideListBtns = document.querySelectorAll(".slide-list li");
const controller = document.querySelector(".slide-list");
const slideContainer = document.querySelector(".slide-container");

// 所有轮播图片
const slideImages = [
    "../../img/weflow-news.png",
    "../../img/weflow-courses.png",
    "../../img/weflow-live-stream.png",
    "../../img/weflow-chat.png",
    "../../img/weflow-user-analysis.png"
];

let currentIndex = 0;
let isHovering = false;
const totalTabs = ControlSlideListBtns.length;

// 初始聚光灯位置
moveGlowtoActive();

controller.addEventListener("mouseenter", () => {
    isHovering = true;
});

controller.addEventListener("mouseleave", () => {
    isHovering = false;
    moveGlowtoActive();
});

// 点击按钮时切换 active
ControlSlideListBtns.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        ControlSlideListBtns.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        moveGlowtoActive();
        currentIndex = index;
        updateSlide(index);
        resetTimer(); // 重新设置计时器
    });
});

// 聚光灯移动到当前选中的 li
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

// 初始化轮播图片
function initializeSlides() {
    slideContainer.innerHTML = '';
    
    // 渲染所有图片
    slideImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = index === currentIndex ? 'active' : 'inactive';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        
        div.appendChild(img);
        slideContainer.appendChild(div);
    });
    
    // 设置初始位置
    updateSlide(currentIndex);
}

// 更新轮播图位置和样式
function updateSlide(index) {
    currentIndex = index;
    
    // 更新所有幻灯片的类名
    const slides = slideContainer.querySelectorAll('div');
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.className = 'active';
        } else {
            slide.className = 'inactive';
        }
    });
    
    // 计算需要滚动的位置 (使当前幻灯片居中)
    const slideWidth = slides[0].offsetWidth;
    const margin = parseInt(getComputedStyle(slides[0]).marginLeft) + 
                parseInt(getComputedStyle(slides[0]).marginRight);
    
    const scrollPosition = index * (slideWidth + margin);
    slideContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// 自动切换到下一个 tab
function autoNext() {
    currentIndex = (currentIndex + 1) % totalTabs;
    updateTab(currentIndex);
    updateSlide(currentIndex);
}

// 更新 tab 和光圈
function updateTab(index) {
    ControlSlideListBtns.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
    });
    
    if (!isHovering) {
        moveGlowtoActive();
    }
}

// 设置计时器，自动切换 tab
let timer = setInterval(autoNext, 3000);

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoNext, 3000); // 每 3 秒自动轮播
}

initializeSlides();