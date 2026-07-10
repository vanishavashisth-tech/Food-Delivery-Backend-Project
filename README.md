# 🍔 Food Delivery Backend API

A scalable and production-ready **Food Delivery Backend** built using the **MERN Stack**. This project provides secure REST APIs for a food delivery platform similar to **Zomato**, **Swiggy**, and **Uber Eats**.

It includes authentication, restaurant management, food management, orders, payments, reviews, image uploads, and an admin dashboard.

---

## 🚀 Features

### 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Tokens
- Password Hashing (bcrypt)
- Protected Routes
- Role-Based Authorization
- Change Password
- Profile Management

### 🍽 Restaurant Management

- Create Restaurant
- Update Restaurant
- Delete Restaurant
- Restaurant Profile
- Restaurant Logo & Banner Upload
- Restaurant Approval (Admin)

### 🍕

- Add Food Item
- Update Food Item
- Delete Food Item
- Upload Food Images
- Category Management
- Veg / Non-Veg Filter
- Availability Status

### 🛒 Cart

- Add to Cart
- Update Quantity
- Remove Items
- Persistent Cart
- Coupon Support
- Delivery Charges
- Tax Calculation

### 📦 Orders

- Place Orders
- Cash on Delivery
- Online Payments
- Order Tracking
- Order History
- Order Status Updates
- Invoice Generation

### ⭐ Reviews

- Add Ratings
- Add Reviews
- Edit Reviews
- Delete Reviews
- Restaurant Average Rating

### 💳 Payments

- Stripe Payment Gateway
- Payment Verification
- Payment Success
- Payment Failure

### 👨‍💼 Admin

- Admin Dashboard
- Manage Users
- Manage Restaurants
- Manage Orders
- Manage Categories
- Revenue Analytics

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcrypt

## Image Upload

- Multer
- Cloudinary

## Payment

- Stripe

## Security

- Helmet
- CORS
- Rate Limiting
- MongoDB Sanitization
- XSS Protection

---

# 📁 Project Structure

```
server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── uploads/
├── seed/
│
├── app.js
├── server.js
└── package.json
```

---

# 📂 Database Collections

## Users

```javascript
{
  name,
  email,
  password,
  phone,
  role,
  avatar,
  address
}
```

## Restaurants

```javascript
{
  owner,
  restaurantName,
  logo,
  banner,
  description,
  cuisines,
  location,
  rating,
  deliveryTime
}
```

## Foods

```javascript
{
  restaurantId,
  name,
  description,
  category,
  image,
  price,
  isVeg,
  availability
}
```

## Orders

```javascript
{
  customer,
  restaurant,
  items,
  total,
  paymentStatus,
  orderStatus,
  deliveryAddress
}
```

## Reviews

```javascript
{
  customer,
  restaurant,
  rating,
  review
}
```

## Coupons

```javascript
{
  code,
  discount,
  expiry
}
```

---

# 🔐 Authentication

The project uses **JWT Authentication**.

### Protected Routes

- Customer Routes
- Restaurant Routes
- Admin Routes

Authorization Middleware

- Customer
- Restaurant Owner
- Admin

---

# 📡 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
```

---

## Restaurants

```
GET    /api/restaurants
GET    /api/restaurants/:id
POST   /api/restaurants
PUT    /api/restaurants/:id
DELETE /api/restaurants/:id
```

---

## Foods

```
GET    /api/foods
GET    /api/foods/:id
POST   /api/foods
PUT    /api/foods/:id
DELETE /api/foods/:id
```

---

## Cart

```
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

---

## Orders

```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
```

---

## Reviews

```
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

---

## Payments

```
POST   /api/payment/create-payment-intent
POST   /api/payment/webhook
```

---

## Admin

```
GET    /api/admin/dashboard
GET    /api/admin/users
GET    /api/admin/restaurants
GET    /api/admin/orders
```

---

# ⚙ Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=

CLIENT_URL=http://localhost:5173
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/Food-Delivery-Backend-Project.git
```

Move into the project

```bash
cd Food-Delivery-Backend-Project
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# 📌 Future Improvements

- Email Notifications
- Push Notifications
- Live Order Tracking
- Google Maps Integration
- Delivery Partner Module
- Recommendation System
- AI-based Food Suggestions
- Coupon Engine
- Referral System

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Vanisha Vashisth**

- GitHub: https://github.com/vanishavashisth-tech

---

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!
