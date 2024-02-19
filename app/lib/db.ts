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
    connectionLimit: 1000,
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

// Example function to insert records from an array of objects
export const insertRecords = async (records: any[]) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        // Loop through each record in the array
        for (const record of records) {
            // Construct the INSERT SQL statement dynamically based on the record's properties
            const sql = `INSERT INTO your_table (column1, column2, column3) VALUES (?, ?, ?)`;
            const values = [record.column1, record.column2, record.column3]; // Adjust as per your object's properties

            // Execute the INSERT SQL statement
            await connection.query(sql, values);
        }

        // Commit the transaction
        await connection.commit();

        console.log('All records inserted successfully');
    } catch (error) {
        // If any error occurs, rollback the transaction
        if (connection) {
            await connection.rollback();
        }
        console.error('Error inserting records:', error);
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
}

