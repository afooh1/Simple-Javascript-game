document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) window.location.href = 'login.html';

    document.getElementById('playerDisplayName').textContent = currentUser.username;
    document.getElementById('gamesPlayed').textContent = currentUser.gamesPlayed || 0;

    let score = 0;
    let firstCard = null;
    let waiting = false;
    let matches = 0;
    const totalPairs = 8;

    // Initialize game
    function initGame() {
        score = 0;
        document.getElementById('scoreDisplay').textContent = score;
        document.getElementById('circlesContainer').innerHTML = '';
        
        // Create pairs (1-8, each appearing twice)
        let numbers = [];
        for (let i = 1; i <= totalPairs; i++) {
            numbers.push(i, i);
        }
        
        // Shuffle
        numbers = numbers.sort(() => Math.random() - 0.5);
        
        // Create cards
        numbers.forEach((num, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.number = num;
            card.dataset.index = i;
            
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = '?';
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = num;
            
            cardInner.appendChild(cardBack);
            cardInner.appendChild(cardFront);
            card.appendChild(cardInner);
            card.addEventListener('click', handleCardClick);
            
            document.getElementById('circlesContainer').appendChild(card);
        });
    }

    // Handle card clicks
    function handleCardClick(e) {
        if (waiting) return;
        
        const card = e.target.closest('.card');
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        
        if (!firstCard) {
            firstCard = card;
        } else {
            waiting = true;
            
            if (firstCard.dataset.number === card.dataset.number) {
                // Match found
                score += parseInt(card.dataset.number);
                document.getElementById('scoreDisplay').textContent = score;
                
                firstCard.classList.add('matched');
                card.classList.add('matched');
                matches++;
                
                if (matches === totalPairs) {
                    updateHighScore();
                    setTimeout(() => alert(`You won! Score: ${score}`), 500);
                }
            } else {
                // No match
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    card.classList.remove('flipped');
                }, 1000);
            }
            
            setTimeout(() => {
                firstCard = null;
                waiting = false;
            }, 1000);
        }
    }

    // Update high score
    function updateHighScore() {
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        
        users[userIndex].gamesPlayed++;
        if (score > users[userIndex].highScore) {
            users[userIndex].highScore = score;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('gamesPlayed').textContent = users[userIndex].gamesPlayed;
    }

    // New game button
    document.getElementById('newGame').addEventListener('click', function() {
        if (currentUser.gamesPlayed >= 10) {
            alert('You used all 10 sessions. Please logout and login again.');
            return;
        }
        initGame();
    });

    initGame();
});