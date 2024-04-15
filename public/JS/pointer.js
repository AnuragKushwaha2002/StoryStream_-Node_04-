var main = document.querySelector(".main");
var crsr = document.querySelector(".point");
var mouseX = 0;
var mouseY = 0;
var isInside = false;

main.addEventListener("mousemove", function (event) {
    mouseX = event.clientX; // Mouse X position relative to the viewport
    mouseY = event.clientY; // Mouse Y position relative to the viewport
    isInside = true; // Flag to indicate cursor is inside the page
});

document.addEventListener("mouseleave", function () {
    isInside = false; // Flag to indicate cursor is outside the page
});

function updateCursor() {
    if (isInside) {
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; // Get the horizontal scroll position
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Get the vertical scroll position

        crsr.style.left = mouseX + scrollLeft + "px"; // Adjust left position based on scroll
        crsr.style.top = mouseY + scrollTop + "px"; // Adjust top position based on scroll

        crsr.style.display = "block"; // Show the pointer
    } else {
        crsr.style.display = "none"; // Hide the pointer when outside the page
    }

    requestAnimationFrame(updateCursor); // Call updateCursor on the next animation frame
}

updateCursor(); // Start the animation loop
