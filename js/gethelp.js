// Get Help button handler - routes to profile if signed in, else signin
document.addEventListener('DOMContentLoaded', function() {
    const student = sessionStorage.getItem('student');
    // All course pages are 2 levels deep (e.g., unity/intro.html), so use ../../backend/
    const target  = student ? '../../backend/profile.html' : '../../backend/signin.html';

    document.querySelectorAll('a.btn-get-help, a.help-button').forEach(function(btn) {
        btn.href = target;
    });

    // Also handle inline Get Help links with href="#" containing the text
    document.querySelectorAll('a[href="#"]').forEach(function(btn) {
        if (btn.textContent.trim().includes('Get Help')) {
            btn.href = target;
        }
    });
});
