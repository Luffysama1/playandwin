document.addEventListener('DOMContentLoaded', () => {
    console.log("Tournament Website is Live!");
});
// JavaScript function to display the signup form when the "Join Now!" button is clicked
document.getElementById('join-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor action
    document.getElementById("signup-form").classList.add("show"); // Show the signup form with animation
    document.getElementById("overlay").style.display = "block"; // Show the overlay
});

// Close the signup form and overlay when clicking on the overlay
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById("signup-form").classList.remove("show"); // Hide the signup form
    document.getElementById("overlay").style.display = "none"; // Hide the overlay
});
// Example JavaScript for interactivity (if needed)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Loaded and Ready');
});

  