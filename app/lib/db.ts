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
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    // connectionLimit: 10,
    queueLimit: 0,
});


export const executeQuery = async <T>(query: string, values?: any[]): Promise<T[]> => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query<[]>(query, values);
        return rows;
    } finally {
        connection.release();
    }
};
