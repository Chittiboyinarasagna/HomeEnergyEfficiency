document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded");

    // Example: Alert message when clicking the buttons
    document.querySelectorAll("nav button").forEach(button => {
        button.addEventListener("click", function () {
            alert("Navigating to: " + this.innerText);
        });
    });
});