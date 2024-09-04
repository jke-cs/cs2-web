// src/app/api/playerStats/route.ts (Next.js 13+ mit App-Router)
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  // MySQL-Datenbankkonfiguration
  const connection = await mysql.createConnection({
    host: '192.168.178.108',
    user: 'newuser',
    password: 'newpassword',
    database: 'cs',
  });

  try {
    // Datenbankabfrage
    const [rows] = await connection.execute(
      `
      SELECT pr.PlayerName, pr.SteamID, ps.GlobalPoints
      FROM PlayerRecords pr
      LEFT JOIN PlayerStats ps ON pr.PlayerName = ps.PlayerName
      GROUP BY pr.PlayerName
      ORDER BY ps.GlobalPoints DESC
      LIMIT 10
      `
    );

    // Rückgabe der Daten im JSON-Format
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.error();
  } finally {
    await connection.end();
  }
}
