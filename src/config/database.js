const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./finance.sqlite');

const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const getQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const initDB = async () => {
    await runQuery(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT CHECK(role IN ('Viewer', 'Analyst', 'Admin')),
            is_active BOOLEAN DEFAULT 1
        )
    `);

    await runQuery(`
        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            type TEXT CHECK(type IN ('income', 'expense')),
            category TEXT,
            date TEXT,
            notes TEXT
        )
    `);

    const users = await getQuery(`SELECT * FROM users`);
    if (users.length === 0) {
        const hashed = await bcrypt.hash('adminpassword', 10);
        await runQuery(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, 
        ['admin@finance.com', hashed, 'Admin']);
        console.log('Admin created: admin@finance.com / adminpassword');
    }
};

module.exports = { runQuery, getQuery, initDB };