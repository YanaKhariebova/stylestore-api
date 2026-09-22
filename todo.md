## Aufgabenplan

### 1. Projekt vorbereiten

- Node.js-Projekt initialisieren
- `package.json` erstellen
- Express und weitere benötigte Pakete installieren
- `"type": "module"` in `package.json` eintragen
- Ordnerstruktur für Routes, Controller, Middleware und Validierung erstellen
- `.gitignore` und `.env` erstellen

### 2. Datenbank einrichten

- Eine PostgreSQL-Datenbank mit dem Namen `stylestore_db` erstellen
- Prisma installieren und initialisieren
- `DATABASE_URL` in der `.env-Datei eintragen
- Die Verbindung zwischen Prisma und PostgreSQL testen

### 3. Datenmodelle erstellen

- Das Modell `Category` erstellen
- Das Modell `Product` erstellen
- Eine One-to-Many-Beziehung einrichten:
  - Eine Kategorie kann mehrere Produkte haben
  - Ein Produkt gehört zu genau einer Kategorie
- Eine Prisma-Migration erstellen
- Testdaten in der Datenbank speichern

### 4. Kategorie-Endpunkte implementieren

- `POST /api/categories` – eine neue Kategorie erstellen
- `GET /api/categories` – alle Kategorien abrufen
- `GET /api/categories/:id/products` – alle Produkte einer Kategorie abrufen
- Prüfen, ob eine Kategorie bereits existiert

### 5. Produkt-Endpunkte implementieren

- `POST /api/products` – ein neues Produkt erstellen
- `GET /api/products` – alle Produkte mit ihrer Kategorie abrufen
- `GET /api/products/:id` – ein bestimmtes Produkt abrufen
- `PATCH /api/products/:id` – ein Produkt bearbeiten
- `DELETE /api/products/:id` – ein Produkt löschen

### 6. Eingaben validieren

- Zod installieren und konfigurieren
- Name, Preis, Lagerbestand und Kategorie-ID validieren
- Negative Preise verhindern
- Negativen Lagerbestand verhindern
- Leere Produktnamen verhindern
- Ungültige Daten mit dem Statuscode `400` beantworten

### 7. API absichern

- Helmet für sichere HTTP-Header verwenden
- Rate Limiting hinzufügen
- Die maximale Größe von JSON-Anfragen begrenzen
- `x-powered-by` deaktivieren
- geheime Daten nur in der `.env-Datei speichern
- keine technischen oder sensiblen Details in Fehlermeldungen anzeigen

### 8. Fehler behandeln

- Eine Middleware für unbekannte Endpunkte erstellen
- Eine zentrale Error-Handler-Middleware erstellen
- Passende HTTP-Statuscodes verwenden:
  - `200` für erfolgreiche GET-Anfragen
  - `201` für erfolgreich erstellte Daten
  - `400` für ungültige Eingaben
  - `404` für nicht gefundene Daten
  - `409` für Konflikte
  - `500` für Serverfehler

### 9. API testen

- Alle Endpunkte mit Postman testen
- Gültige und ungültige Eingaben testen
- Prüfen, ob die Daten in PostgreSQL gespeichert werden
- Fehlerfälle testen, zum Beispiel eine nicht vorhandene Kategorie
- Rate Limiting testen

### 10. Projekt dokumentieren und abgeben

- Projektbeschreibung in `README.md` schreiben
- Verwendete Technologien auflisten
- ERD-Diagramm hinzufügen
- Endpunkte und Request-Beispiele dokumentieren
- Installationsanleitung ergänzen
- Git-Repository initialisieren
- GitHub-Repository erstellen
- Projekt auf GitHub hochladen
- GitHub-Link mit dem Instructor teilen
