const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Static files for CSS, JS
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Store users and tournaments
let users = [];
let tournaments = ["Fortnite Weekly", "Head 2 Head Weekly", "Summer Championship"];

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

/// Tournament page (requires user to be signed up)
app.get('/tournament', (req, res) => {
    if (!req.session.isSignedUp) {
        return res.redirect('/signup'); // Redirect to signup if not signed up
    }
    res.send(`
        <h1>Welcome to the Tournament</h1>
        <ul>
            ${tournaments.map(tournament => `<li>${tournament}</li>`).join('')}
        </ul>
    `);
});
// Handle signup form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    users.push({ username, email, password });
    req.session.isSignedUp = true;  // Mark the user as signed up
    res.redirect('/tournament');    // Redirect to the tournament page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
