import mysql, { ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise();

export async function SelectQuery<T>(query: string, values?: any): Promise<T[]> {
    const [result] = await pool.query(query, values);
    return result as T[];
}

export async function InsertQuery<T>(query: string, values: T): Promise<ResultSetHeader> {
    const [result] = await pool.query(query, values);
    return result as ResultSetHeader;
}

export async function UpdateQuery<T>(query: string, values: T): Promise<ResultSetHeader> {
    const [result] = await pool.query(query, values);
    return result as ResultSetHeader;
}

export async function DeleteQuery<T>(query: string, values: T): Promise<ResultSetHeader> {
    const [result] = await pool.query(query, values);
    return result as ResultSetHeader;
}
