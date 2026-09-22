# StyleStore API 🛍️

## 📝 Projektbeschreibung

Die StyleStore API ist eine REST-API zur Verwaltung von Kategorien und
Produkten eines Onlineshops.

Eine Kategorie kann mehrere Produkte enthalten. Jedes Produkt gehört zu genau
einer Kategorie. Die API ermöglicht das Erstellen und Abrufen von Kategorien
sowie vollständige CRUD-Operationen für Produkte.

## 🛠️ Technologien und Tools

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Zod
- Helmet
- Express Rate Limit
- Postman

## ✨ Funktionen

- Kategorien erstellen und abrufen
- Produkte erstellen, abrufen, bearbeiten und löschen
- Produkte zusammen mit ihren Kategorien abrufen
- Eingabevalidierung mit Zod
- Zentrale Fehlerbehandlung
- Rate Limiting
- Sichere HTTP-Header mit Helmet
- Begrenzung der JSON-Anfragegröße

## 📁 Projektstruktur

```text
stylestore-api/
├── prisma/
│   ├── migrations/          # Datenbankmigrationen
│   ├── schema.prisma       # Datenmodelle und Beziehungen
│   └── seed.js             # Testdaten
├── src/
│   ├── controllers/
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── database/
│   │   └── prismaClient.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── schemas/
│   │   └── productSchema.js
│   └── server.js           # Express-Server
├── .env.example                # Beispiel für Umgebungsvariablen
├── .gitignore
├── package.json
├── prisma.config.ts
└── README.md
```

## 🗂️ ERD

```mermaid
erDiagram
    Category ||--o{ Product : enthält

    Category {
        int id PK
        string name UK
        datetime createdAt
        datetime updatedAt
    }

    Product {
        int id PK
        string name
        decimal price
        int stock
        int categoryId FK
        datetime createdAt
        datetime updatedAt
    }
```

## 🔗 API-Endpunkte

### Kategorien

| Methode | Endpunkt                       | Beschreibung                          |
| ------- | ------------------------------ | ------------------------------------- |
| POST    | `/api/categories`              | Neue Kategorie erstellen              |
| GET     | `/api/categories`              | Alle Kategorien mit Produkten abrufen |
| GET     | `/api/categories/:id/products` | Kategorie mit ihren Produkten abrufen |

### Produkte

| Methode | Endpunkt            | Beschreibung                        |
| ------- | ------------------- | ----------------------------------- |
| POST    | `/api/products`     | Neues Produkt erstellen             |
| GET     | `/api/products`     | Alle Produkte mit Kategorie abrufen |
| GET     | `/api/products/:id` | Einzelnes Produkt abrufen           |
| PATCH   | `/api/products/:id` | Produkt teilweise bearbeiten        |
| DELETE  | `/api/products/:id` | Produkt löschen                     |

## 📬 Beispielanfragen

Die Basis-URL der API lautet:

```text
http://localhost:3000
```

### Kategorie erstellen

```http
POST /api/categories
Content-Type: application/json
```

```json
{
  "name": "Accessoires"
}
```

### Produkt erstellen

```http
POST /api/products
Content-Type: application/json
```

```json
{
  "name": "Sneaker",
  "price": 89.99,
  "stock": 10,
  "categoryId": 5
}
```

Die angegebene `categoryId` muss in der Datenbank existieren.

### Produkt bearbeiten

```http
PATCH /api/products/7
Content-Type: application/json
```

```json
{
  "price": 99.99,
  "stock": 15
}
```

### Produkt löschen

```http
DELETE /api/products/7
```

### Beispiel für eine Fehlermeldung

```json
{
  "message": "Produkt nicht gefunden"
}
```

## 🚀 Installation und Start

### Voraussetzungen

- Node.js
- npm
- PostgreSQL

### 1. Repository herunterladen

```bash
git clone https://github.com/YanaKhariebova/stylestore-api.git
cd stylestore-api
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. PostgreSQL-Datenbank erstellen

```sql
CREATE DATABASE stylestore_db;
```

### 4. Umgebungsvariablen konfigurieren

Die Beispieldatei kopieren:

```bash
cp .env.example .env
```

Anschließend den eigenen PostgreSQL-Benutzernamen und das Passwort in `.env`
eintragen:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/stylestore_db"
PORT=3000
NODE_ENV="development"
```

### 5. Migrationen ausführen

```bash
npx prisma migrate dev
```

### 6. Prisma Client generieren

```bash
npx prisma generate
```

### 7. Testdaten einfügen

Achtung: Der Seed-Befehl löscht vorhandene Kategorien und Produkte und erstellt
anschließend neue Testdaten.

```bash
npm run prisma:seed
```

### 8. Server starten

```bash
npm start
```

Die API ist anschließend erreichbar unter:

```text
http://localhost:3000
```
