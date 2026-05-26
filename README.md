
# ⚡ Electricity Theft Detection System (SparkGuard – Backend)

A full-stack intelligent system for detecting electricity theft using AI models, built with a scalable backend and a Flutter mobile application.

---

## 🚀 Overview

This project provides an end-to-end solution for:

* User management with authentication & authorization
* Admin dashboard for monitoring system activity
* AI-powered electricity theft detection
* Secure token-based authentication system
* Email-based account activation workflow

---

## 🧠 System Architecture

```
Flutter App (User / Admin)
        ↓
   Node.js Backend (API)
        ↓
 MongoDB Database
        ↓
 FastAPI AI Model
```

✔️ The backend acts as a **middleware** between Flutter and the AI model.

---

## 🛠️ Tech Stack

### 🔹 Backend

* Node.js (Express.js)
* MongoDB (Mongoose)
* JWT Authentication
* Redis (Session & token handling)
* Nodemailer (Email system)

### 🔹 AI Integration

* FastAPI (Python)
* Machine Learning model for prediction

### 🔹 Frontend

* Flutter (User + Admin interfaces)

---

## 🔐 Authentication System

* Access Token & Refresh Token (JWT)
* Role-based authorization (Admin / User)
* Session invalidation using `changeCredentialTime`
* Secure login & logout flow

---

## 👥 User Flow

1. User signs up
2. Admin approves user
3. User receives activation email
4. User activates account
5. User logs in & uses prediction service

---

## 👑 Admin Features

* Approve users
* View system statistics
* Monitor predictions
* Soft delete & restore users

---

## 📊 API Endpoints

### 🔹 Auth

* `POST /auth/signup`
* `POST /auth/login`
* `GET /auth/activate`

### 🔹 User

* `GET /user/profile`
* `PATCH /user/updateProfile`
* `PATCH /user/password`
* `POST /user/logout`

### 🔹 Prediction

* `POST /predict`

```json
{
  "readings": [120, 130, 150]
}
```

### 🔹 Admin

* `PATCH /admin/approve/:id`
* `GET /admin/users`
* `GET /admin/deletedUsers`
* `DELETE /admin/users/:id`
* `PATCH /admin/users/:id/restore`
* `GET /admin/stats`
* `GET /admin/predictions`

---

## 📦 Database Models

### 👤 User Model

* Name, Email, Password
* Role (Admin / User)
* Status (PENDING, APPROVED, ACTIVE)
* Soft delete support
* Security fields (changeCredentialTime)

### 📈 Prediction Model

* Result (Normal / Theft)
* Confidence
* Variation

---

## 🤖 AI Integration

* Backend sends user readings to FastAPI
* FastAPI returns:

  * prediction
  * confidence
  * variation
* Stored in MongoDB

---

## 🎯 Key Features

✔️ Clean architecture
✔️ Role-based security
✔️ Email activation system
✔️ Token rotation
✔️ AI integration
✔️ Scalable backend

---

## 📸 Suggested UI (Admin Dashboard)

* Dashboard cards:

  * Total Predictions
  * Theft Cases
  * Normal Cases

* User Management Table:

  * Name | Email | Status | Actions
  * Buttons: Approve / Delete / Restore

* Prediction Chart:

  * Pie chart (Normal vs Theft)

---

## ⚙️ Run Locally

```bash
npm install
npm run start-dev
```

---

## 🌍 Deployment

* Backend deployed on AWS (EC2)
* Environment variables managed via `.env.prod`
* Process manager: PM2

---

## 👩‍💻 Documentation
Documentation EndPoints: https://api-docs.hoppscotch.io/view/573ddd5a-5cdf-43cf-a6a9-0c5501dfb614/CURRENT

## 👩‍💻 Author

Rahma Salama 🚀

---

## 💡 Notes

This project demonstrates real-world backend architecture, secure authentication, and integration with AI systems.

