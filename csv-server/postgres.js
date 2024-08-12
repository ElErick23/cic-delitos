const fs = require('fs');
const pgp = require('pg-promise')();
require('dotenv').config();

class Connection {
    static async open() {
        if (this.db) return this.db;
        
        const connectionOptions = {
            ssl: {
                rejectUnauthorized: true,
                ca: fs.readFileSync('./ca.pem').toString(),
            }
        };

        // Parse the connection URL
        const url = new URL(this.url);

        // Construct the full connection config
        const config = {
            user: url.username,
            password: url.password,
            host: url.hostname,
            port: url.port,
            database: url.pathname.slice(1),  // remove leading '/'
            ssl: connectionOptions.ssl,
        };

        const db = pgp(config);
        this.db = db;
        return this.db;
    }
}

Connection.db = null;
Connection.url = process.env.DATABASE_URL || `postgres://avnadmin:AVNS_Xck-DVdJEViGkHzYCr7@pg-649b1f5-ceic-delitos.l.aivencloud.com:23300/defaultdb?sslmode=require`;

console.log(Connection.url);

module.exports = { Connection };