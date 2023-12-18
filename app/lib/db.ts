import mysql from 'mysql2/promise'

// // create the connection to database\
// export async function connection() {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         database: 'pos_db',
//         password: ''
//     });
// }

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool
