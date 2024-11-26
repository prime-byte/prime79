// Wait until DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const userNameInput = document.getElementById('user-name');
    const submitNameBtn = document.getElementById('submit-name-btn');
    const personalizedGreeting = document.getElementById('personalized-greeting');
    const nameModal = document.getElementById('name-modal');
    const welcomeMessage = document.getElementById('welcome-message');
    const termsSection = document.getElementById('terms-section');
    const acceptTermsCheckbox = document.getElementById('accept-terms');
    const confirmBtn = document.getElementById('confirm-btn');
    const termsModal = document.getElementById('terms-modal');
    const redirectBtn = document.getElementById('redirect-btn');
    const closeModalBtn = document.querySelector('.close');

    // Show modal on load
    nameModal.style.display = 'block';

    // Submit name button functionality
    submitNameBtn.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            personalizedGreeting.textContent = `Welcome, ${userName}!`;
            nameModal.style.display = 'none';
            welcomeMessage.classList.remove('hidden');
            termsSection.classList.remove('hidden');
        } else {
            alert('Please enter your name to proceed.');
        }
    });

    // Enable/Disable confirm button based on checkbox
    acceptTermsCheckbox.addEventListener('change', function () {
        if (this.checked) {
            confirmBtn.classList.remove('disabled');
            confirmBtn.disabled = false;
        } else {
            confirmBtn.classList.add('disabled');
            confirmBtn.disabled = true;
        }
    });

    // Open confirmation modal on button click
    confirmBtn.addEventListener('click', () => {
        termsModal.style.display = 'block';
    });

    // Close modal with the close button
    closeModalBtn.addEventListener('click', () => {
        termsModal.style.display = 'none';
    });

    // Redirect to home page
    redirectBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Change this to your home page URL
    });
});
