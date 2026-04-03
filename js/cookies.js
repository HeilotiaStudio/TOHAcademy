(function() {
    if (localStorage.getItem('cookiesAccepted')) return;
    
    window.addEventListener('load', function() {
        document.getElementById('cookieModal').style.display = 'flex';
    });
    
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookieModal').style.display = 'none';
    });
})();
