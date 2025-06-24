# 🔪 K6 PoC – Performance Testing Framework

This project demonstrates how to use [k6](https://k6.io/) and [Playwright](https://playwright.dev/) to run backend and BFF (Browser First Flow) performance tests.

---

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anetaderkova/k6_poc.git
cd k6_poc
```

---

### 2. Create a .env File

Create a `.env` file in the root directory of the project with the following content:

```env
CLIENT_SECRET=secret for etuity-core-frontend-web-ClientSecret from test-its-credentials Azure key vault
LOGIN_PASSWORD=secret for core-counterparty-passWord from test-etuity-virtuoso Azure key vault
```

> 💡 Do **not** commit this file. It should be listed in `.gitignore`.

---

### 3. Install Dependencies

Install the required Node.js packages:

```bash
npm install
npx playwright install
```

---

## 🔪 Running Tests Locally

### ✅ Backend Tests (k6)

This will execute all backend test scripts in `tests/backend/`:

```bash
node run_backend_tests.js
```

### ✅ BFF Tests (Playwright + k6)

This script uses Playwright to log in, gets cookies, and passes them to k6:

```bash
node run_bff_tests.js
```

---

## 🤩 Test Profiles

Test behavior is controlled using the `profile` environment variable. Available profiles:

| Profile | Description                         |
|---------|-------------------------------------|
| smoke   | Minimal test to validate endpoints  |
| load    | Simulate average traffic load       |
| stress  | Push system beyond normal limits    |
| spike   | Sudden burst of traffic             |
| soak    | Prolonged, stable traffic           |

### How to Use a Profile (PowerShell example):

```powershell
$env:profile = "load"
node run_backend_tests.js
```

> 💡 Default profile is `smoke` if none is provided.

