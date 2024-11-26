const rewardRequirements = {
    'Free Coffee': 3000,
    'Discount Voucher': 2000,
    'Gift Card': 1500,
};

let userCoins = parseInt(localStorage.getItem('userCoins') || '7000'); // Default to 5000 coins

// Update Coin Balance
function updateCoinBalance() {
    const balanceElement = document.getElementById('coin-balance');
    balanceElement.textContent = userCoins;

    // Check eligibility for rewards
    checkRewardEligibility();
}

// Check Eligibility for Rewards
function checkRewardEligibility() {
    Object.entries(rewardRequirements).forEach(([rewardName, requiredCoins], index) => {
        const claimButton = document.getElementById(`claim-reward${index + 1}`);
        const notEligibleText = claimButton.nextElementSibling;

        if (userCoins >= requiredCoins) {
            claimButton.disabled = false;
            claimButton.style.display = 'inline-block'; // Show button
            notEligibleText.style.display = 'none'; // Hide "Not enough coins" text
        } else {
            claimButton.disabled = true;
            claimButton.style.display = 'none'; // Hide button
            notEligibleText.style.display = 'block'; // Show "Not enough coins" text
        }
    });
}

// Claim Reward
function claimReward(rewardName) {
    const requiredCoins = rewardRequirements[rewardName];

    if (userCoins >= requiredCoins) {
        userCoins -= requiredCoins;
        localStorage.setItem('userCoins', userCoins); // Save updated coins in localStorage
        updateCoinBalance(); // Update UI

        // Show reward popup
        showRewardPopup(`🎉 Congratulations!`, `You claimed ${rewardName}!`);
    } else {
        showNotification('❌ Not enough coins to claim this reward!', true); // Show error
    }
}

function showRewardPopup(title, message) {
    const popup = document.getElementById('reward-popup');
    const popupTitle = document.getElementById('reward-popup-title');
    const popupMessage = document.getElementById('reward-popup-message');

    popupTitle.textContent = title;
    popupMessage.textContent = message;

    popup.classList.remove('hide');

    // Automatically close the popup after 5 seconds
    setTimeout(() => {
        closeRewardPopup();
    }, 5000);
}

function closeRewardPopup() {
    const popup = document.getElementById('reward-popup');
    popup.classList.add('hide');
}

// Function to show notifications
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#dc3545' : '#28a745';
    notification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Function to show a popup (e.g., rules popup)
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove('hide');
    setTimeout(() => {
        document.getElementById('close-popup').disabled = false; // Enable close button after 3 seconds
    }, 1000);
}

// Function to close a popup
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add('hide');
}

// Initialize the page
window.onload = function () {
    updateCoinBalance(); // Display the current coin balance on page load
    showPopup('instructions-popup'); // Show rules popup on load
};
