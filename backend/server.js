const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Konfiguracja połączenia z MySQL
const dbConfig = {
  host: process.env.DB_HOST || "mysql-db",
  user: process.env.DB_USER || "counter_user",
  password: process.env.DB_PASSWORD || "counterpass",
  database: process.env.DB_NAME || "counter_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

// Inicjalizacja bazy danych
async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);

    // Tworzenie tabeli jeśli nie istnieje
    await pool.query(`
      CREATE TABLE IF NOT EXISTS counter (
        id INT PRIMARY KEY AUTO_INCREMENT,
        value INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Sprawdzenie czy istnieje rekord, jeśli nie - dodaj
    const [rows] = await pool.query("SELECT * FROM counter WHERE id = 1");
    if (rows.length === 0) {
      await pool.query("INSERT INTO counter (id, value) VALUES (1, 0)");
    }

    console.log("✅ Połączono z bazą danych MySQL");
  } catch (error) {
    console.error("❌ Błąd połączenia z bazą danych:", error);
    setTimeout(initDatabase, 5000);
  }
}

// Endpoint: Pobierz aktualną wartość licznika
app.get("/api/counter", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT value FROM counter WHERE id = 1");
    res.json({ value: rows[0].value });
  } catch (error) {
    console.error("Błąd pobierania licznika:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Endpoint: Zwiększ licznik
app.post("/api/counter/increment", async (req, res) => {
  try {
    await pool.query("UPDATE counter SET value = value + 1 WHERE id = 1");
    const [rows] = await pool.query("SELECT value FROM counter WHERE id = 1");
    res.json({ value: rows[0].value });
  } catch (error) {
    console.error("Błąd zwiększania licznika:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Endpoint: Zmniejsz licznik
app.post("/api/counter/decrement", async (req, res) => {
  try {
    await pool.query("UPDATE counter SET value = value - 1 WHERE id = 1");
    const [rows] = await pool.query("SELECT value FROM counter WHERE id = 1");
    res.json({ value: rows[0].value });
  } catch (error) {
    console.error("Błąd zmniejszania licznika:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Endpoint: Reset licznika
app.post("/api/counter/reset", async (req, res) => {
  try {
    await pool.query("UPDATE counter SET value = 0 WHERE id = 1");
    const [rows] = await pool.query("SELECT value FROM counter WHERE id = 1");
    res.json({ value: rows[0].value });
  } catch (error) {
    console.error("Błąd resetowania licznika:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Endpoint: Status API
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend działa poprawnie" });
});

// Start serwera
initDatabase().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Serwer nasłuchuje na porcie ${PORT}`);
  });
});
