# 💳 Finance Data Processing & Access Control API

This repository contains a secure, role-based backend system designed to manage financial records and provide real-time dashboard analytics. I developed this project to demonstrate a clean-code approach to **Role-Based Access Control (RBAC)**, data persistence with **SQLite**, and secure user authentication.

## 🌟 Key Features
- **Granular Access Control:** A custom middleware layer manages permissions for **Admin**, **Analyst**, and **Viewer** roles.
- **Automated Analytics:** The Dashboard API leverages SQL aggregations to calculate total income, expenses, and category-wise spending on the fly.
- **Security First:** Implemented **JWT (JSON Web Tokens)** for session management and **BcryptJS** for industrial-grade password hashing.
- **Relational Data Integrity:** Uses SQLite with defined schemas and constraints to ensure data consistency across transactions.

---

## 🏗 Project Architecture

I followed a modular structure to ensure the codebase remains scalable and easy to audit:

* **`server.js`**: The entry point that initializes the Express application and database connection.
* **`routes/`**: Cleanly separated endpoints for Authentication, Records, and Dashboard logic.
* **`middleware/authMiddleware.js`**: The central "Security Guard" of the app. It decodes JWTs and verifies if a user's role is authorized to access specific resources.
* **`controllers/`**: Contains the business logic, keeping the routes thin and readable.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the necessary dependencies:
```bash
npm install
```
### 2. Running the Server
```
Start the backend locally:
node server.js
The system will automatically generate a finance.sqlite file and seed a default Admin user on the first run.
```
### 3. Default Admin Credentials (For Testing)
**Email:** `admin@finance.com`
**Password:** `adminpassword`

| Feature | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: |
| Create/Manage Users | ✅ | ❌ | ❌ |
| Add/Edit Records | ✅ | ❌ | ❌ |
| View All Records | ✅ | ✅ | ❌ |
| View Dashboard Summary | ✅ | ✅ | ✅ |

---

## API Overview
Authentication
POST /api/login: Validates credentials and returns a Bearer Token.

## Records Management
GET /api/records: Fetches all transactions. Supports filtering via query parameters (e.g., /api/records?type=income or ?category=Salary).

POST /api/records: Adds a new financial entry (Restricted to Admin).

## Analytics & Dashboard
GET /api/dashboard/summary: Returns a JSON object containing total_income, total_expense, net_balance, and a breakdown of category_totals.
