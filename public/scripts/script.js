// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        html.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        if (html.classList.contains('dark-theme')) {
            // Switch to light theme
            html.classList.remove('dark-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            html.classList.add('dark-theme');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark-theme');
                themeIcon.textContent = '☀️';
            } else {
                html.classList.remove('dark-theme');
                themeIcon.textContent = '🌙';
            }
        }
    });
});
