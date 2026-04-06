const { runQuery, getQuery } = require('../config/database');

exports.create = async (req, res) => {
    const { amount, type, category, date, notes } = req.body;
    // Basic validation
    if (!amount || !type || !category || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    await runQuery(`INSERT INTO records (amount, type, category, date, notes) VALUES (?,?,?,?,?)`, 
    [amount, type, category, date, notes]);
    res.status(201).json({ message: 'Record created' });
};

exports.getAll = async (req, res) => {
    // Added Filtering capability
    const { type, category } = req.query;
    let query = `SELECT * FROM records WHERE 1=1`;
    const params = [];

    if (type) { query += ` AND type = ?`; params.push(type); }
    if (category) { query += ` AND category = ?`; params.push(category); }
    query += ` ORDER BY date DESC`;

    const records = await getQuery(query, params);
    res.json(records);
};

// Added Update feature
exports.update = async (req, res) => {
    const { amount, type, category, date, notes } = req.body;
    await runQuery(
        `UPDATE records SET amount=?, type=?, category=?, date=?, notes=? WHERE id=?`, 
        [amount, type, category, date, notes, req.params.id]
    );
    res.json({ message: 'Record updated' });
};

exports.delete = async (req, res) => {
    await runQuery(`DELETE FROM records WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Record deleted' });
};