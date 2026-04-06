const express = require('express');
const cors = require('cors');
const recordRoutes = require('./routes/recordRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { getQuery, runQuery } = require('./config/database');
const { authenticate, authorize } = require('./middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Auth Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = (await getQuery(`SELECT * FROM users WHERE email = ? AND is_active = 1`, [email]))[0];
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        return res.json({ token, role: user.role });
    }
    res.status(401).json({ error: 'Invalid credentials or inactive user' });
});


app.post('/api/users', authenticate, authorize(['Admin']), async (req, res) => {
    const { email, password, role } = req.body;
    if (!['Viewer', 'Analyst', 'Admin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }
    try {
        const hashed = await bcrypt.hash(password, 10);
        await runQuery(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, [email, hashed, role]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
});

app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;