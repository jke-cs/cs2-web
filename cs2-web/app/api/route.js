import mysql from 'mysql2/promise';

export async function GET() {
  // Erstelle eine Verbindung zur Datenbank
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    port: 3306,
  });

  try {
    // Führe die Abfrage aus, um alle Einträge der Tabelle PlayerRecords abzurufen
    const [rows] = await connection.query('SELECT * FROM PlayerRecords');
    // Beende die Verbindung
    await connection.end();
    
    // Sende die Daten als JSON-Antwort
    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Behandle Fehler und sende eine Fehlermeldung
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
