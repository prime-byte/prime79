document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll functionality for navigation
    const navLinks = document.querySelectorAll('.nav-bar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
});
