# tz_effective_mobile

## Prerequisites

- **Node.js**: Version 20.x
- **Docker**: For running PostgreSQL
- **npm**: For managing dependencies
- **Ubuntu**: Instructions are tailored for Ubuntu, but adaptable to other systems

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tz_effective_mobile
```

### 2. Install Dependencies
Install Node.js dependencies:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file to create your `.env` file:
```bash
cp .env.sample .env
```

Edit `.env` to set your PostgreSQL password and a secure JWT secret:
```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-actual-password
DB_NAME=effective_mobile
JWT_SECRET=your-secret-key
PORT=3000
```

### 4. Start PostgreSQL with Docker
Start the PostgreSQL container:
```bash
docker compose up -d
```

Verify the container is running:
```bash
docker ps
```

### CAUTION!
The database (`effective_mobile`) and user table will be created automatically by TypeORM when the application starts.

### 5. Run the Application
Start the application in development mode:
```bash
npm run dev
```

### 6. Test the API
Example registration:
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"fullName":"John Doe","birthDate":"1990-01-01","email":"john.doe@example.com","password":"password123"}'
```
