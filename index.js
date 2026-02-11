// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
        return;
    }
    

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the page from refreshing

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple check (Not secure for real production)
        if (username === 'BUKleger' && password === 'Mars2025') {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Feil brukernavn eller passord.');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Navigasjon
    const navItems = {
        'timeplan': 'timeplan.html',
        'kunnskapskilden': 'kunnskap.html',
        'kalkulatorer': 'kalk.html',
        'bilirubin': 'bilirubin.html',
    };

    Object.keys(navItems).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.onclick = () => window.location.href = navItems[id];
    }); });