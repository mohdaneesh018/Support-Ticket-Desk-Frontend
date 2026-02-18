# 🎫 Support Ticket System - Frontend

- Frontend application for the Support Ticket Desk system built using React (Vite).

- This application provides role-based access for Admin and User with full ticket management UI.

---

## 🚀 Tech Stack

- React (Vite)
- React Router DOM
- Axios
- React Hot Toast
- Context API (Auth Management)
- Inline Modern UI Styling

---


## 🔐 Authentication Features

- User Signup
- User Login (JWT Based)
- Role Based Access (Admin / User)
- Protected Routes
- Persistent Login using LocalStorage
- Logout Confirmation Modal

---


## 👤 Role-Based Access

## 👨‍💼 Admin

- View all tickets
- Filter tickets (status)
- Search tickets (title)
- Update ticket status
- Assign tickets to users
- Add comments
- View all ticket details

---


## 👤 User

- Create ticket
- View only their tickets
- Search & Filter their tickets
- Add comments
- View ticket status updates

---


## 📊 Ticket Features

- Create Ticket
- Update Status (Open → In Progress → Resolved → Closed)
- Assign Ticket (Admin Only)
- Comment System
- Search by Title
- Filter by Status
- Role-based ticket visibility

---


## 🎨 UI Highlights

- Clean professional layout
- Gradient Navbar
- Status badges (color styled)
- Modern Card Layout
- Styled Forms (Login, Signup, Create Ticket)
- Logout confirmation popup

---


## ⚙️ Setup Instructions --

## 1️⃣ Install Dependencies
npm install

## 2️⃣ Run Development Server
npm run dev


## Frontend runs on:
http://localhost:5173


## Backend API base URL:
http://localhost:5000/api


## 🔄 API Integration

- All API calls are handled via Axios instance with:
- Base URL configured
- JWT token attached automatically via interceptor
- Authorization header: Bearer <token>

---


## 🛡 Security

- JWT stored in LocalStorage
- Auto decode user role
- Route Protection via ProtectedRoute
- Admin-only controls hidden for users

---


## ✨ Final Features Completed

- Role Based Dashboard
- Search + Filter Working Together
- Comment System
- Status Flow Enforcement
- Assignment Feature
- Modern UI Styling
- Logout Confirmation Modal
- Persistent Login After Refresh