document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser?.isAdmin) return;

    // Load users data
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Populate leaderboard
    const leaderboard = document.getElementById('leaderboardTable').querySelector('tbody');
    users.sort((a, b) => b.highScore - a.highScore).forEach((user, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${user.username}</td>
            <td>${user.highScore}</td>
            <td>${user.gamesPlayed}</td>
            <td><button class="delete-btn" data-username="${user.username}">Delete</button></td>
        `;
        leaderboard.appendChild(row);
    });

    // Populate user management
    const userTable = document.getElementById('usersTable').querySelector('tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td><button class="delete-btn" data-username="${user.username}">Delete</button></td>
        `;
        userTable.appendChild(row);
    });

    // Delete user functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const username = this.dataset.username;
            if (confirm(`Delete ${username}?`)) {
                const updatedUsers = users.filter(u => u.username !== username);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                location.reload();
            }
        });
    });

    // Search functionality
    document.getElementById('searchUser').addEventListener('input', function() {
        const term = this.value.toLowerCase();
        document.querySelectorAll('#usersTable tbody tr').forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            row.style.display = name.includes(term) ? '' : 'none';
        });
    });
});