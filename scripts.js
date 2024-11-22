document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const sideLinks = document.querySelectorAll(".side-link");

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
