// Initialize storage
if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));

// Handle login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'game.html';
    } else {
        alert('Invalid credentials');
    }
});

// Handle signup
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }

    const newUser = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        username: document.getElementById('newUsername').value,
        password: password,
        gamesPlayed: 0,
        highScore: 0
    };

    const users = JSON.parse(localStorage.getItem('users'));
    if (users.some(u => u.username === newUser.username)) {
        alert('Username already exists');
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = 'game.html';
});