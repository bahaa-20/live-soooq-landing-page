document.addEventListener("DOMContentLoaded", () => {
    initFeaturesAnimations();
    initStepsTabs();
    initWhyChooseUs();
    initNeverWait();
    initScreensSlider();
    initSidebarMenu();
    initBackToTop();
});

/* ---------------------------
   Features Section Animations
---------------------------- */
function initFeaturesAnimations() {
    const section = document.querySelector(".features-section");
    if (!section) return;

    const featureCards = section.querySelectorAll(".feature-card");
    const featureImage = section.querySelector("img");
    const sectionTitle = section.querySelector("h1");
    const svgDashes = section.querySelectorAll(".features-container > svg");
    const doodleSVG = section.querySelector(".features-subtitle > svg:first-child");
    const engagingLine = section.querySelector(".features-subtitle h2");
    const quoteSVGs = section.querySelectorAll(".features-subtitle .text > svg");

    // Pause animations initially
    [...featureCards, featureImage, sectionTitle, doodleSVG, engagingLine, ...svgDashes, ...quoteSVGs]
        .forEach(el => el && (el.style.animationPlayState = "paused"));

    observeOnce(section, () => {
        [...featureCards, featureImage, sectionTitle, doodleSVG, engagingLine, ...svgDashes, ...quoteSVGs]
            .forEach(el => el && (el.style.animationPlayState = "running"));
    });
}

/* ---------------------------
   Steps Tabs + Seller Section
---------------------------- */
function initStepsTabs() {
    const tabs = document.querySelectorAll('.steps-tabs button');
    const stepsContainers = document.querySelectorAll('.steps');
    const sellerSection = document.querySelector('.steps.seller');

    if (sellerSection) {
        observeOnce(sellerSection, () => sellerSection.classList.add('active'), 0.3);
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            stepsContainers.forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
            });

            tab.classList.add('active');
            const activeSteps = stepsContainers[index];
            activeSteps.style.display = 'flex';
            void activeSteps.offsetWidth; // reflow
            activeSteps.classList.add('active');
        });
    });
}

/* ---------------------------
   Why Choose Us Section
---------------------------- */
function initWhyChooseUs() {
    const section = document.querySelector('.why-choose-us-section');
    if (section) {
        observeOnce(section, () => section.classList.add('animate'), 0.3);
    }
}

/* ---------------------------
   Never Wait Section
---------------------------- */
function initNeverWait() {
    const section = document.querySelector(".never-wait");
    if (section) {
        observeOnce(section, () => section.classList.add('animate'), 0.3);
    }
}

/* ---------------------------
   Screens Slider
---------------------------- */
function initScreensSlider() {
    const container = document.getElementById('screens');
    if (!container) return;

    const wrapper = container.parentElement;
    const images = Array.from(container.children);
    const imagesCount = images.length;
    const startIndex = 7; // 8th image
    const repeatCount = 3;

    // Duplicate for seamless scrolling
    for (let i = 0; i < repeatCount - 1; i++) {
        images.forEach(img => container.appendChild(img.cloneNode(true)));
    }

    const allImages = Array.from(container.children);
    let currentIndex = startIndex + imagesCount;

    let loadedCount = 0;
    allImages.forEach(img => {
        if (img.complete) loadedCount++;
        img.onload = () => {
            if (++loadedCount === allImages.length) initSlider();
        };
    });

    function initSlider() {
        updateActive();
        centerActive();

        setInterval(() => {
            currentIndex++;
            if (currentIndex >= allImages.length - imagesCount) {
                currentIndex -= imagesCount;
                container.style.transition = 'none';
                centerActive();
                requestAnimationFrame(() => {
                    container.style.transition = 'transform 0.5s linear';
                    currentIndex++;
                    updateActive();
                    centerActive();
                });
            } else {
                updateActive();
                centerActive();
            }
        }, 2000);
    }

    function updateActive() {
        allImages.forEach((img, i) => img.classList.toggle('active', i === currentIndex));
    }

    function centerActive() {
        const activeImg = allImages[currentIndex];
        const activeCenter = activeImg.offsetLeft + activeImg.offsetWidth / 2;
        const offset = activeCenter - wrapper.offsetWidth / 2;
        container.style.transform = `translateX(${-offset}px)`;
    }
}

/* ---------------------------
   Sidebar Menu
---------------------------- */
function initSidebarMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close-btn");

    if (!menuBtn || !sidebar || !overlay || !closeBtn) return;

    const closeSidebar = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    };

    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
}

/* ---------------------------
   Back to Top Button
---------------------------- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const scrollContainer = document.querySelector('.scroll-container');
    if (!btn || !scrollContainer) return;

    btn.addEventListener('click', () => {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------------------------
   Helper: Observe Once
---------------------------- */
function observeOnce(target, callback, threshold = 0.5) {
    if (!target) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold });
    observer.observe(target);
}
