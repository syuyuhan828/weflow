const words = ["我們提供最好的資源平台","你能找到志同道合的夥伴", "你不再孤單"];
let wordIndex = 0;
let letterIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 50;
const typeTarget = document.getElementById("typewriter");

function type(){
    const fullText = words[wordIndex];

    if ( isDeleting ){
        currentText = fullText.substring(0, letterIndex--);
    } else {
        currentText = fullText.substring(0, letterIndex++);
    }

    typeTarget.textContent = currentText;

    if (!isDeleting && letterIndex === fullText.length + 1){
        isDeleting = true;
        setTimeout(type, 3000);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = ( wordIndex + 1 ) % words.length;
        setTimeout(type, 50);
    } else {
        setTimeout(type, isDeleting ? 50:speed);
    }
}

type();