document.addEventListener("DOMContentLoaded", () => {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll(".section");
    const sideLinks = document.querySelectorAll(".side-link");
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;
    const cards = document.querySelectorAll(".education-card, .experience-card, .project-card"); // Select all cards

    // Show side navigation after scrolling down
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
                sideLinks.forEach(link => link.classList.remove("active"));
                sideLinks[index].classList.add("active");
            }
        });
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
    sideLinks.forEach(link => link.classList.add("dark")); // Apply dark mode to side links
    }   

    // Function to remove dark mode
    function removeDarkMode() {
    body.classList.remove("dark");
    document.querySelector("header").classList.remove("dark");
    cards.forEach(card => card.classList.remove("dark"));
    sideLinks.forEach(link => link.classList.remove("dark")); // Remove dark mode from side links
    }

});
