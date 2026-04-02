<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

<h1 align="center">🚗 Used Vehicle E-commerce Portal</h1>

<p align="center">
  <strong>A modern, full-stack web application for listing, browsing, and inquiring about used vehicles. Designed with a clean architecture and a responsive user interface.</strong>
</p>

---

## 📖 About the Project

**Used Vehicle Portal** is a comprehensive platform built to facilitate the buying and selling of used vehicles. It provides an intuitive interface for users to browse available cars and bikes, filter them based on their preferences, and send inquiries directly to the sellers or administrators.

The project demonstrates a robust implementation of the **MERN** (MongoDB, Express.js, React, Node.js) architecture with a clear separation of concerns, utilizing an MVC pattern on the backend and a component-based UI on the frontend.

### What Does It Do?

- **🚗 Vehicle Listings** — View a comprehensive catalog of used cars and bikes with detailed information including make, model, year, price, mileage, and high-quality images.
- **🔍 Search & Filter** — Easily find the perfect vehicle using advanced search functionality and filters (e.g., price range, make, year).
- **✉️ Inquiry System** — Seamlessly send inquiries about specific vehicles directly from the listing page.
- **👥 User Management** — Basic user tracking and management for interactions.
- **💾 Database Seeding** — Automatic database seeding mechanism to populate the platform with realistic demo data on startup if the collection is empty.
- **📱 Responsive Design** — A fully responsive and accessible UI built with Tailwind CSS, ensuring a great experience across desktop and mobile devices.

---

## 🏗️ How We Built It

### Architecture

The portal follows a standard **Full-Stack MERN-style architecture**:

1. **Frontend (React)** — A modern Single Page Application (SPA) built with **React 19** and bootstrapped using **Vite 8** for lightning-fast development server start times and HMR.
2. **Backend (Node.js & Express)** — A RESTful API built with Express, following the **MVC (Model-View-Controller)** design pattern for clean, maintainable, and scalable code.
3. **Database (MongoDB)** — Uses MongoDB coupled with the Mongoose ODM for flexible schema definitions and efficient data querying.

### Design Philosophy

- **Speed & Simplicity** — Using Vite and Tailwind CSS ensures fast bundle times and rapid UI development.
- **Clean API Design** — RESTful endpoints grouped logically (Users, Vehicles, Inquiries) for ease of integration.
- **Extensible Configuration** — Environment-based configuration via `.env` files for security and flexibility.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 | UI component library |
| **Build Tool** | Vite 8 | Dev server & bundler |
| **Styling** | Tailwind CSS 4 | Utility-first styling framework |
| **Icons** | Lucide React | Beautiful open-source SVG icons |
| **Routing** | React Router DOM v7 | Client-side routing |
| **HTTP Client** | Axios | Promise-based HTTP client for API requests |
| **Backend Runtime** | Node.js | JavaScript runtime environment |
| **Web Framework** | Express.js | API routing and middleware |
| **Database** | MongoDB | NoSQL document database |
| **ODM** | Mongoose | Object Data Modeling for MongoDB |

---

## 📁 Project Structure

```
used-vehicle-portal/
├── frontend/                      # React Frontend App
│   ├── index.html                 # App entry point
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── src/
│       ├── main.jsx               # React app bootstrap
│       ├── App.jsx                # Root component and routing
│       └── index.css              # Global styles (Tailwind)
│
├── config/                        # Configuration files (DB connection)
├── controllers/                   # Backend Controllers
├── models/                        # Mongoose Database Models
├── routes/                        # Express API Routes
│   ├── inquiryRoutes.js
│   ├── userRoutes.js
│   └── vehicleRoutes.js
├── utils/                         # Helper functions and simple utilities
├── server.js                      # Express server entry point
├── package.json                   # Backend dependencies and scripts
└── .env                           # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A running **MongoDB** instance (local or MongoDB Atlas cluster)

### Installation & Setup

1. **Clone the repository** (if you haven't already) and navigate to the project root:
   ```bash
   cd used-vehicle-portal
   ```

2. **Configure Environment Variables**
   Create or modify the `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Install Backend Dependencies & Start**
   ```bash
   npm install
   npm run dev  # Starts the backend server with nodemon
   ```
   *Note: On the first run, the backend will automatically seed the database with initial vehicle listings if the collection is empty.*

4. **Install Frontend Dependencies & Start**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev  # Starts the Vite development server
   ```

The frontend will be available at standard Vite port (usually `http://localhost:5173`) and connect to the backend API running on `http://localhost:5000`.

---

## 🔮 Future Improvements

- **🔐 Authentication & Authorization** — Add JWT-based user authentication for secure user roles (e.g., Admin vs. Customer).
- **👤 User Dashboard** — A dedicated space for users to manage their saved vehicles, preferences, and inquiries.
- **🛠️ Admin Panel** — A comprehensive admin interface to intuitively add, edit, and remove vehicle listings without database access.
- **🖼️ Image Uploads** — Integration with an external storage service (like AWS S3 or Cloudinary) for robust image storage and CDN distribution.
- **📝 Reviews & Ratings** — Allow users to leave reviews on sellers or vehicles.

---

## 📄 License

This project is proprietary and confidential.

---

<p align="center">
  Built with ❤️ using the MERN Stack & Tailwind CSS
</p>
