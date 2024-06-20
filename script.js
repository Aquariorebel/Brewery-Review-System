document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    fetch(`http://localhost:8000/api/search/by_city/${query}`)
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.forEach(brewery => {
                output += `<h3>${brewery.name}</h3>
                           <p>${brewery.city}, ${brewery.state}</p>
                           <a href="brewery.html?id=${brewery.id}">Details</a>`;
            });
            document.getElementById('results').innerHTML = output;
        });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:8000/auth/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:8000/auth/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'login.html';
    });
});

if (document.getElementById('reviewForm')) {
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = document.getElementById('rating').value;
        const description = document.getElementById('description').value;
        const breweryId = new URLSearchParams(window.location.search).get('id');
        fetch(`http://localhost:8000/api/reviews/${breweryId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ rating, description })
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
        });
    });

    window.onload = function() {
        const breweryId = new URLSearchParams(window.location.search).get('id');
        fetch(`http://localhost:8000/api/breweries/${breweryId}/`)
            .then(response => response.json())
            .then(brewery => {
                document.getElementById('breweryName').innerText = brewery.name;
                document.getElementById('breweryDetails').innerText = `${brewery.city}, ${brewery.state}`;
            });

        fetch(`http://localhost:8000/api/reviews/${breweryId}/`)
            .then(response => response.json())
            .then(reviews => {
                let output = '';
                reviews.forEach(review => {
                    output += `<h4>${review.user.username} - ${review.rating}</h4>
                               <p>${review.description}</p>`;
                });
                document.getElementById('reviews').innerHTML = output;
            });
    };
}
