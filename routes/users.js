const express = require('express');
return res.status(400).json({ error: err.message });
}
const id = this.lastID;
db.get('SELECT * FROM users WHERE id = ?', [id], (err2, row) => {
if (err2) return res.status(500).json({ error: err2.message });
res.status(201).json({ data: mapUser(row) });
});
});
});


// PUT /api/users/:id - replace/update user
router.put('/:id', (req, res) => {
const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
if (!name || !email) {
return res.status(400).json({ error: 'Name and email are required fields.' });
}


const sql = `UPDATE users SET name = ?, email = ?, phone = ?, company = ?, street = ?, city = ?, zipcode = ?, lat = ?, lng = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
const params = [name, email, phone || null, company || null, street || null, city || null, zipcode || null, lat || null, lng || null, req.params.id];


db.run(sql, params, function (err) {
if (err) return res.status(400).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err2, row) => {
if (err2) return res.status(500).json({ error: err2.message });
res.json({ message: 'User updated successfully', data: mapUser(row) });
});
});
});


// PATCH /api/users/:id - partial update
router.patch('/:id', (req, res) => {
const allowed = ['name','email','phone','company','street','city','zipcode','lat','lng'];
const updates = [];
const params = [];
for (const key of allowed) {
if (req.body[key] !== undefined) {
updates.push(`${key} = ?`);
params.push(req.body[key]);
}
}
if (updates.length === 0) return res.status(400).json({ error: 'No valid fields provided for update' });
params.push(req.params.id);
const sql = `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
db.run(sql, params, function (err) {
if (err) return res.status(400).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err2, row) => {
if (err2) return res.status(500).json({ error: err2.message });
res.json({ message: 'User updated', data: mapUser(row) });
});
});
});


// DELETE /api/users/:id - delete user
router.delete('/:id', (req, res) => {
const sql = 'DELETE FROM users WHERE id = ?';
db.run(sql, [req.params.id], function (err) {
if (err) return res.status(500).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
res.json({ message: 'User deleted successfully' });
});
});


module.exports = router;
