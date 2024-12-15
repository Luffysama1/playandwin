const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Static files for CSS, JS
app.use(session({
    secret: 'admin-secret',
    resave: false,
    saveUninitialized: true
}));

// Mock admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'password'
};

// Store tournaments in-memory
let tournaments = [];

// Admin Login Route
app.get('/admin/login', (req, res) => {
    res.send(`
        <form action="/admin/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminCredentials.username && password === adminCredentials.password) {
        req.session.isAdmin = true;
        return res.redirect('/admin/dashboard');
    }
    res.send('Invalid credentials');
});

// Admin Dashboard Route
app.get('/admin/dashboard', (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    res.send(`
        <h1>Admin Dashboard</h1>
        <a href="/admin/manage-tournaments">Manage Tournaments</a><br>
        <a href="/admin/logout">Logout</a><br><br>
        <h3>Current Tournaments:</h3>
        <ul>
            ${tournaments.map(tournament => `<li>${tournament.name} - ${tournament.start_date}</li>`).join('')}
        </ul>
    `);
});

// Admin Logout Route
app.get('/admin/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/admin/login');
    });
});

// Manage Tournaments Route
app.get('/admin/manage-tournaments', (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    res.send(`
        <h1>Manage Tournaments</h1>
        <form action="/admin/create-tournament" method="POST">
            <input type="text" name="name" placeholder="Tournament Name" required>
            <input type="date" name="start_date" required>
            <textarea name="description" placeholder="Description" required></textarea>
            <button type="submit">Create Tournament</button>
        </form>
        <a href="/admin/dashboard">Back to Dashboard</a>
    `);
});

// Create Tournament Logic
app.post('/admin/create-tournament', (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect('/admin/login');
    }
    const { name, start_date, description } = req.body;
    tournaments.push({ name, start_date, description });
    res.send(`
        <h3>Tournament Created Successfully!</h3>
        <a href="/admin/manage-tournaments">Create Another Tournament</a>
        <a href="/admin/dashboard">Back to Dashboard</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
