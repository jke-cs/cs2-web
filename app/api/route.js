import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'YOUR_HOST',
    user: 'YOUR_USER',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DBNAME',
    port: 3306,
  });

  try {
    const [rows] = await connection.query('SELECT * FROM PlayerRecords');
    await connection.end();
    
    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
