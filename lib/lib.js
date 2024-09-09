// lib/db.ts

import mysql from 'mysql2/promise';

export async function getPlayerStats() {
  const connection = await mysql.createConnection({
    host: 'YOUR_HOST',
    user: 'YOUR_USER',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DBNAME'
  });

  const [rows] = await connection.execute('SELECT PlayerName, GlobalPoints, SteamID FROM player_stats ORDER BY GlobalPoints DESC');
  await connection.end();
  return rows;
}
