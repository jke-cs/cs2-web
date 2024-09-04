// pages/api/playerStats.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // MySQL-Datenbankkonfiguration
  const connection = await mysql.createConnection({
    host: '192.168.178.70', // Dein Host
    user: 'newuser',      // Dein Benutzername
    password: 'newpassword',      // Dein Passwort
    database: 'cs' // Dein Datenbankname
  });

  try {
    // Daten abfragen
    const [rows] = await connection.query('SELECT * FROM player_stats');

    // Rückgabe der Daten als JSON
    res.status(200).json(rows);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  } finally {
    // Verbindung schließen
    await connection.end();
  }
}
