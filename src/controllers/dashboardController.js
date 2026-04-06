const { getQuery } = require('../config/database');

exports.getSummary = async (req, res) => {
    const totals = await getQuery(`
        SELECT 
            SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expense
        FROM records
    `);
    const categories = await getQuery(`SELECT category, SUM(amount) as total FROM records GROUP BY category`);
    
    res.json({
        balance: (totals[0].income || 0) - (totals[0].expense || 0),
        income: totals[0].income || 0,
        expense: totals[0].expense || 0,
        categories
    });
};