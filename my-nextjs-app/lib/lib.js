// lib/db.ts

import mysql from 'mysql2/promise';

export async function getPlayerStats() {
  const connection = await mysql.createConnection({
    host: 'localhost',   // Deine DB-Host
    user: 'root',        // Dein DB-Benutzername
    password: 'password',// Dein DB-Passwort
    database: 'your_database' // Deine Datenbankname
  });

  const [rows] = await connection.execute('SELECT PlayerName, GlobalPoints, SteamID FROM player_stats ORDER BY GlobalPoints DESC');
  await connection.end();
  return rows;
}
