const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Mock database for tournaments
let tournaments = [
    { name: "Fortnite Weekly Nano", start_date: "2024-12-20", prize: "$739" },
    { name: "Apex Legends Monthly", start_date: "2024-12-25", prize: "$800" }
];

// Serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Signup page
app.get('/signup', (req, res) => {
    res.send(`
        <form action="/signup" method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="email" name="email" placeholder="Email" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Sign Up</button>
        </form>
    `);
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    users.push({ username, email, password });
    req.session.isSignedUp = true;  // Mark the user as signed up
    res.send(`
        <h1>Signup Successful!</h1>
        <p>Redirecting you to the tournament page...</p>
        <script>
            setTimeout(() => { window.location.href = '/tournament'; }, 2000);
        </script>
    `);
});

// Tournaments Page (Protected Route)
app.get('/tournaments', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/signup'); // If not logged in, redirect to signup
    }

    let tournamentList = tournaments.map(tournament => `
        <div>
            <h3>${tournament.name}</h3>
            <p>Starts on: ${tournament.start_date}</p>
            <p>Prize: ${tournament.prize}</p>
        </div>
    `).join('');

    res.send(`
        <h2>Available Tournaments</h2>
        ${tournamentList}
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
