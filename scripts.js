document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.classList.add("hover-effect");
        });
        button.addEventListener("mouseleave", () => {
            button.classList.remove("hover-effect");
        });
    });
});
