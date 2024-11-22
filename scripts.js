document.addEventListener("DOMContentLoaded", () => {
    const sideNav = document.querySelector(".side-nav");
    const sections = document.querySelectorAll(".section");
    const sideLinks = document.querySelectorAll(".side-link");

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
});
