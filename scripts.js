document.addEventListener("DOMContentLoaded", () => {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll(".section");
    const sideLinks = document.querySelectorAll(".side-link");
    const themeSwitch = document.getElementById("theme-switch"); // New: Access the theme toggle
    const body = document.body;

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

    // New: Light/Dark Mode Toggle
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        themeSwitch.checked = true; // Set toggle to dark mode
    }

    // Add event listener to the theme switch
    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            body.classList.add("dark"); // Apply dark mode
            localStorage.setItem("theme", "dark"); // Save preference
        } else {
            body.classList.remove("dark"); // Revert to light mode
            localStorage.setItem("theme", "light"); // Save preference
        }
    });
});
