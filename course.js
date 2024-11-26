const courses = [
    { id: "course1", title: "Course 1: Web Development" },
    { id: "course2", title: "Course 2: Data Science" }
];

// Add new courses to the top and display in the highlighted section
function addNewCourse(title, courseId) {
    const newCoursesList = document.getElementById('newCoursesList');
    const courseItem = document.createElement('li');
    courseItem.textContent = title;
    newCoursesList.insertBefore(courseItem, newCoursesList.firstChild);

    // Add new course to courses array and display in the main courses section
    courses.unshift({ id: courseId, title });
}

// Filter and display search suggestions
function filterCourses(event) {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (input) {
        const matchedCourses = courses.filter(course => course.title.toLowerCase().includes(input));

        if (matchedCourses.length > 0) {
            suggestions.style.display = 'block';
            matchedCourses.forEach(course => {
                const courseElement = document.createElement('a');
                courseElement.href = `#${course.id}`;
                courseElement.innerHTML = course.title;
                courseElement.onclick = () => {
                    document.getElementById(course.id).scrollIntoView({ behavior: 'smooth' });
                    suggestions.style.display = 'none';
                };
                suggestions.appendChild(courseElement);
            });
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }

    // Trigger search on Enter key press
    if (event.key === 'Enter') {
        searchCourses();
    }
}

// Search and highlight matching courses
function searchCourses() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const courseElements = document.querySelectorAll('.course');
    const suggestions = document.getElementById('suggestions');

    let foundCourse = false;
    courseElements.forEach(course => {
        const courseTitle = course.querySelector('.course-title').textContent.toLowerCase();
        if (courseTitle.includes(input)) {
            course.style.display = 'block';
            course.scrollIntoView({ behavior: 'smooth' });
            foundCourse = true;
        } else {
            course.style.display = 'none';
        }
    });

    // Hide suggestions after pressing enter
    suggestions.style.display = 'none';
    
    if (!foundCourse) {
        alert("No matching courses found.");
    }
}

// Example of adding a new course (this can be called dynamically as needed)
addNewCourse("Course 3: Advanced JavaScript", "course3");
