# 📚 MERN Web Application

A full-stack **MERN** web application designed to efficiently manage the core administrative operations, including student registration, academic records, examination processes, and communication services for **Pabna Collectorate Model School & College**.

---

## 📖 Table of Contents

- [🚀 Tech Stack](#-tech-stack)
- [📋 Features](#-features)
- [⚡ Setup & Installation](#-setup--installation)
  - [🛠 Prerequisites](#-prerequisites)
  - [🚀 Backend Setup](#-backend-setup)
  - [🌍 Frontend Setup](#-frontend-setup)
  - [🧪 Testing & Linting](#-testing--linting)
- [📜 License](#-license)
- [📌 Author](#-author)

---

## 🚀 Tech Stack

- **Frontend**: React, Bootstrap, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **Others**: ESLint, Prettier, Multer, Bcrypt

---

## 📋 Features

✅ **Dashboard** - A centralized control panel to monitor student records, academic activities, and overall school performance.

✅ **Academic Management** - Handles curriculum planning, faculty assignments, class schedules, and session records to streamline school operations.

✅ **Student Management** - Manages student admissions, personal records, attendance tracking, and class promotions for an organized student database.

✅ **Exam Management** - Oversees exam schedules, result processing, and automated generation of report cards, admit cards ID cards and more.

✅ **SMS Management** - Sends automated notifications for attendance, results, fee reminders, and other important updates to students and parents.

---

## ⚡ Setup & Installation

### 🛠 Prerequisites

- **React** (v19.0.0 or higher)
- **React Router DOM** (for routing)
- **Bootstrap** (for styling)
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or remotely)
- **Yarn** (installed globally)
- **Vite** (for frontend build and development)

---

### 🚀 Full Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/imtiaz-cnits/pcmsc-react.git
   cd pcmsc-react
   ```

### 🚀 Backend Setup

2.  **Navigate to the backend folder and install dependencies**

    ```sh
    cd backend
    yarn install
    ```

### 📌 Configure the .env file:

3. **Rename the `.env.example` file to `.env`**

   Before running the project, you need to configure your environment variables.

- Rename the `.env.example` file to `.env` by running the following command:

  ```bash
  mv .env.example .env
  ```

### ▶ Start the Backend Server:

- **For Development mode:**

  ```sh
  yarn start  # Starts the server in development mode
  ```

- **For Development mode:**

  ```sh
  yarn production # Starts the server in production mode
  ```

### 🌍 Frontend Setup

1.  **Navigate to the frontend folder and install dependencies:**

    ```sh
    cd frontend
    yarn install
    ```

### 📌 Configure the .env file:

2. **Rename the `.env.example` file to `.env`**

   ```bash
   mv .env.example .env
   ```

### ▶ Start the Frontend Server:

- **For Development mode:**

  ```sh
  yarn start  # Starts the server in development mode
  ```

- **For Development mode:**

  ```sh
  yarn production # Starts the server in production mode
  ```

### 🧪 Testing & Linting

```sh
yarn lint    # Lint code
yarn format  # Format code
```

### 📜 License

This project is licensed under the **CodeNextIT**.

### 📌 Author

👨‍💻 **Mamunur Rahaman**  
🔗 **GitHub**: [rahaman-mamunur](https://github.com/rahaman-mamunur)  
📧 **Email**: [rahaman.mamunur0829@gmail.com](mailto:rahaman.mamunur0829@gmail.com)
