## Pixisphere Backend API

Pixisphere is a backend platform built with **Node.js**, **Express.js**, and **MongoDB**, supporting three user roles: `client`, `partner`, and `admin`.

This backend handles:

- Authentication (Email/Password + OTP)
- Partner onboarding & admin approval
- Client inquiries (leads)
- Partner portfolios
- Admin dashboard (approvals, KPIs, reviews)
- Category and location management

---

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv**, **cors**, etc.

---


---

## ⚙️ Installation

### 1. Clone this repo

```bash
git clone https://github.com/your-username/pixisphere-backend.git
cd pixisphere-backend
```

2. Install dependencies
```bash
npm install
```
3. Setup environment variables
Create a .env file in the root:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/pixisphere
JWT_SECRET=your_jwt_secret
```

4. Start MongoDB
   ```bash
   mongod
   ```
5. Start the server
```bash
npm start
```
You should see:
```bash
Server running on port 5000
MongoDB connected
```

## API Testing via Postman

1. Register as a partner
```bash
POST /auth/register
Body:
{
  "name": "Devesh",
  "email": "partner@example.com",
  "password": "Secret123!",
  "role": "partner"
}
```

2. Login (fails until admin approves)

```bash
POST /auth/login
Body:
{
  "email": "partner@example.com",
  "password": "Secret123!"
}
```
 Will return 403 Forbidden if not yet approved.
   
As Admin: Approve the partner
```bash
GET    /admin/partners         // list pending profiles
PUT    /admin/partners/:id/approve
```
Use admin token for this!

4. Partner logs in successfully
```bash
POST /auth/login
Returns: { token }
```
5. Submit partner profile
 ```bash
   POST /partners/onboard
Headers:
  Authorization: Bearer <partner_token>
Body:
{
  "bio": "Experienced photographer",
  "serviceCategories": ["wedding", "event"],
  "city": "Delhi",
  "documents": ["mock-url-a", "mock-url-b"]
}
```
6. Client submits inquiry
 ```bash
POST /inquiries
Headers: Bearer <client_token>
Body:
{
  "category": "wedding",
  "city": "Delhi",
  "date": "2025-06-20",
  "budget": 5000,
  "imageUrl": "http://image.com"
}
```
7- Inquiry (Lead) APIs

Create Inquiry (Client)

POST /inquiries
```bash
Headers: Authorization: Bearer <client_token>
{
  "category": "wedding",
  "city": "Delhi",
  "date": "2025-07-01",
  "budget": 15000,
  "imageUrl": "http://image.com/photo.jpg"
}
```
8- Get Assigned Leads (Partner)

GET /inquiries/leads
Headers: Authorization: Bearer <partner_token>

9- Update Inquiry Status (Partner)

PUT /inquiries/:id/status
Headers: Authorization: Bearer <partner_token>
```bash
{
  "status": "responded"
}
```
10- Portfolio APIs (Partner)
Add Portfolio Item

POST /portfolio
Headers: Authorization: Bearer <partner_token>
```bash
{
  "description": "Sample wedding project",
  "imageUrl": "http://portfolio.com/image1.jpg"
}
```
