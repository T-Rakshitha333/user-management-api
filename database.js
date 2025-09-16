const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'users.db');


const db = new sqlite3.Database(DB_FILE, (err) => {
if (err) {
console.error('Could not connect to database', err.message);
throw err;
}
console.log('Connected to SQLite database:', DB_FILE);
});


const initSql = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
phone TEXT,
company TEXT,
street TEXT,
city TEXT,
zipcode TEXT,
lat TEXT,
lng TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME
)
`;


db.serialize(() => {
db.run(initSql, (err) => {
if (err) {
console.error('Error creating users table', err.message);
} else {
console.log('Users table ensured.');
}
});
});


module.exports = db;
