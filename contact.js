// JavaScript for form submission with animations
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Simulate form submission
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = "Thank you! Your message has been sent.";
        statusMessage.classList.add('visible');

        // Clear form fields
        document.getElementById('contactForm').reset();
        
        // Hide message after a few seconds
        setTimeout(() => {
            statusMessage.classList.remove('visible');
        }, 5000);
    } else {
        // If form is incomplete
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = "Please fill in all fields.";
        statusMessage.classList.add('visible');
        setTimeout(() => {
            statusMessage.classList.remove('visible');
        }, 3000);
    }
});


// Example: Contact form submission in contact.js
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Collect form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })  // Ensure correct field names are used
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert(result.message || 'Error sending message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
  