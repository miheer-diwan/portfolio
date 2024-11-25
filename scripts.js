document.addEventListener("DOMContentLoaded", () => {
    const sideNav = document.querySelector(".side-line");
    const sections = document.querySelectorAll(".section");
    const sideLinks = document.querySelectorAll(".side-link");
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;
    const cards = document.querySelectorAll(".education-card, .experience-card, .project-card"); // Select all cards
    const sideCircles = document.querySelectorAll(".side-circle");
    const filterBtns = document.querySelectorAll(".filter-btn"); // Project filter buttons
    const projects = document.querySelectorAll(".project-card"); // Project cards
    const carousels = document.querySelectorAll(".project_carousel"); // Carousels for project cards

    // Show nav line after scrolling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            sideNav.classList.add("visible");
        } else {
            sideNav.classList.remove("visible");
        }
    });

    // Highlight active link
    const highlightSection = () => {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                sideCircles.forEach(circle => circle.classList.remove("active"));
                sideCircles[index].classList.add("active");
            }
        });

        // Highlight Contact Tab if we're at the bottom of the page
        if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight) {
            sideCircles.forEach(circle => circle.classList.remove("active"));
            sideCircles[sideCircles.length - 1].classList.add("active");
        }
    };

    window.addEventListener("scroll", highlightSection);

    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        applyDarkMode();
        themeSwitch.checked = true;
    }

    // Add event listener to the theme switch
    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            applyDarkMode();
            localStorage.setItem("theme", "dark");
        } else {
            removeDarkMode();
            localStorage.setItem("theme", "light");
        }
    });

    // Function to apply dark mode
    function applyDarkMode() {
        body.classList.add("dark");
        document.querySelector("header").classList.add("dark");
        cards.forEach(card => card.classList.add("dark"));
        sideLinks.forEach(link => link.classList.add("dark"));
        filterBtns.forEach(btn => btn.classList.add("dark"));
    }

    // Function to remove dark mode
    function removeDarkMode() {
        body.classList.remove("dark");
        document.querySelector("header").classList.remove("dark");
        cards.forEach(card => card.classList.remove("dark"));
        sideLinks.forEach(link => link.classList.remove("dark"));
        filterBtns.forEach(btn => btn.classList.remove("dark"));
    }

    // Project Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active class to the clicked button
            btn.classList.add("active");

            // Get the filter category
            const filter = btn.getAttribute("data-filter");

            // Show/Hide projects based on the filter
            projects.forEach(project => {
                const categories = project.getAttribute("data-category").split(" ");
                if (filter === "all" || categories.includes(filter)) {
                    project.classList.add("visible");
                } else {
                    project.classList.remove("visible");
                }
            });
        });
    });

    // Initialize: Show all projects by default
    document.querySelector('.filter-btn[data-filter="all"]').click();

    // --- Carousel and Hover Logic ---
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll("img");
        const hoverMedia = carousel.parentElement.querySelector(".hover-media");
        const projectCard = carousel.parentElement; // The project card container
        let currentSlide = 0;
        let interval;

        const updateSlide = () => {
            slides.forEach((slide, index) => {
                slide.classList.remove("active");
                if (index === currentSlide) slide.classList.add("active");
            });
        };

        const startCarousel = () => {
            interval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlide();
            }, 2000);
        };

        const stopCarousel = () => {
            clearInterval(interval);
        };

        // Start the slideshow
        startCarousel();

        // Hover events for switching media
        projectCard.addEventListener("mouseenter", event => {
            // Ensure hover starts only within the project card
            if (hoverMedia && hoverMedia.tagName === "VIDEO") {
                hoverMedia.play(); // Play video
                hoverMedia.style.opacity = "1"; // Show hover video
                carousel.style.opacity = "0"; // Hide the slideshow
                stopCarousel(); // Stop the slideshow
            }
        });

        projectCard.addEventListener("mouseleave", event => {
            // Ensure hover ends only when leaving the project card
            if (hoverMedia && hoverMedia.tagName === "VIDEO") {
                hoverMedia.pause(); // Pause video
                hoverMedia.style.opacity = "0"; // Hide hover video
                carousel.style.opacity = "1"; // Show the slideshow
                startCarousel(); // Resume the slideshow
            }
        });

        // Initialize the first slide as active
        updateSlide();
    });
});
