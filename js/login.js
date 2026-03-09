document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'dashboard.html';
    } else {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = 'Invalid username or password. Please use admin/admin123.';
        errorMessage.classList.remove('hidden');

        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
});
