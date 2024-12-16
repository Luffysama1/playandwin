function validateForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    let isValid = true;
    document.querySelectorAll('.error-message').forEach((el) => (el.style.display = 'none'));

    if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters long.');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('email', 'Invalid email address.');
        isValid = false;
    }

    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match.');
        isValid = false;
    }

    return isValid;
}

function showError(id, message) {
    const errorElement = document.querySelector(`#${id} ~ .error-message`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
