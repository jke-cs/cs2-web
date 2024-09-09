// lib/db.ts

import mysql from 'mysql2/promise';

export async function getPlayerStats() {
  const connection = await mysql.createConnection({
    host: '192.168.178.108',
    user: 'newuser',
    password: '',
    database: ''
  });

  const [rows] = await connection.execute('SELECT PlayerName, GlobalPoints, SteamID FROM player_stats ORDER BY GlobalPoints DESC');
  await connection.end();
  return rows;
}
