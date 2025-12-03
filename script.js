// ===== 공통 DOM =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const globalNav = document.querySelector(".global-nav");
const btnTop = document.querySelector(".btn-top");
const tabs = document.querySelectorAll(".portfolio-tab");
const items = document.querySelectorAll(".portfolio-item");
const moreBtn = document.querySelector(".btn-more");

// ==============================
// 네비 클릭 → 섹션 스크롤
// ==============================
navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = document.querySelector(btn.dataset.target);
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 40,
            behavior: "smooth",
        });

        navLinks.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// ==============================
// 스크롤 위치에 따라 nav active 변경
// ==============================
function updateActiveNavByScroll() {
    let currentId = "";

    sections.forEach((sec) => {
        const offset = sec.offsetTop - 120;
        if (window.pageYOffset >= offset) {
            currentId = "#" + sec.id;
        }
    });

    if (!currentId) return;

    navLinks.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.target === currentId);
    });
}

// ==============================
// 포트폴리오 탭
// ==============================
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const cat = tab.dataset.category;
        items.forEach((item) => {
            item.style.display =
                item.dataset.category === cat ? "flex" : "none";
        });
    });
});

// ==============================
// 더보기 버튼 (현재: 아래로 스크롤)
// ==============================
if (moreBtn) {
    moreBtn.addEventListener("click", () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });
}

// ==============================
// 맨 위로 버튼
// ==============================
function updateTopButton() {
    if (!btnTop) return;
    btnTop.classList.toggle("visible", window.scrollY > 400);
}

if (btnTop) {
    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ==============================
// 모바일: 파란 박스 위치 제어
//  - Home 구간: 왼쪽 상단
//  - About 이후: 오른쪽 상단
// ==============================
function updateMobileNavPosition() {
    if (!globalNav) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        // 데스크톱에서는 항상 왼쪽, 클래스 초기화
        globalNav.classList.remove("on-right");
        return;
    }

    const home = document.querySelector("#home");
    const about = document.querySelector("#about");

    const homeBottom = home
        ? home.offsetTop + home.offsetHeight
        : 0;
    const aboutTop = about ? about.offsetTop : homeBottom;

    const scrollY = window.scrollY;

    // Home 영역에서는 왼쪽
    if (scrollY < aboutTop - 120) {
        globalNav.classList.remove("on-right");
    } else {
        // About 부터는 오른쪽
        globalNav.classList.add("on-right");
    }
}

// ==============================
// 이벤트 묶기
// ==============================
function handleScroll() {
    updateActiveNavByScroll();
    updateTopButton();
    updateMobileNavPosition();
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", updateMobileNavPosition);

document.addEventListener("DOMContentLoaded", () => {
    updateActiveNavByScroll();
    updateTopButton();
    updateMobileNavPosition();
});
