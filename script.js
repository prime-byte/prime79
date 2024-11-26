// Scroll to a specific section on the page
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}
// Toggle mobile menu visibility
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("show");
}


// Navigate to a specific category page
function selectCategory(category) {
    const pages = {
        SCIENCE: 'quiz.html',
        HISTORY: 'history.html',
        TECH: 'tech.html',
        GENERAL: 'general.html',
    };

    if (pages[category]) {
        window.location.href = pages[category];
    } else {
        console.error("Category page not defined.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    const particlesContainer = document.getElementById('particles');

    // Reveal the section on scroll
    const revealSection = () => {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
            aboutSection.classList.add('show');
            window.removeEventListener('scroll', revealSection);
        }
    };
    window.addEventListener('scroll', revealSection);
    revealSection();

    // Interactive particles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
    }

    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
// function of footer 
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const totalVisitorsElement = document.getElementById('total-visitors');
    const totalUsersElement = document.getElementById('total-users');
    const liveUsersElement = document.getElementById('live-users');
  
    // Initialize Local Storage
    if (!localStorage.getItem('totalVisitors')) {
      localStorage.setItem('totalVisitors', 0); // Default value
    }
    if (!localStorage.getItem('totalUsers')) {
      localStorage.setItem('totalUsers', 0); // Default value
    }
  
    // Fetch Stored Values
    let totalVisitors = parseInt(localStorage.getItem('totalVisitors'), 10);
    let totalUsers = parseInt(localStorage.getItem('totalUsers'), 10);
  
    // Update UI
    function updateStatsDisplay() {
      totalVisitorsElement.textContent = totalVisitors.toLocaleString();
      totalUsersElement.textContent = totalUsers.toLocaleString();
    }
    updateStatsDisplay();
  
    // Increment Total Visitors
    setInterval(() => {
      totalVisitors += Math.floor(Math.random() * 5) + 1; // Increment by 1-5
      localStorage.setItem('totalVisitors', totalVisitors);
      updateStatsDisplay();
    }, 3000); // Every 3 seconds
  
    // Increment Registered Users (Simulated New Registrations)
    setInterval(() => {
      totalUsers += Math.floor(Math.random() * 2); // Increment by 0-2
      localStorage.setItem('totalUsers', totalUsers);
      updateStatsDisplay();
    }, 8000); // Every 8 seconds
  
    // Simulate Live Users
    setInterval(() => {
      const liveUsers = Math.floor(Math.random() * 100) + 1; // Fluctuate between 1-100
      liveUsersElement.textContent = liveUsers.toLocaleString();
    }, 2000); // Every 2 seconds
  });
  
// partner withh us function //
  // Fade-In Animation for Cards
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.partner-section .fade-in');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200); // Stagger animation
    });
  });
  