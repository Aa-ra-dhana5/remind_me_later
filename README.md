# 🕒 Reminder Scheduler App

A full-stack MERN (MongoDB, Express, React, Node.js) project that lets users schedule personalized reminders via **Email**, **SMS**, or **both**, and manage them through a clean dashboard. It includes a fully working backend with input validations, real-time message status handling, a task scheduler, and a frontend dashboard to visualize reminder data.

---

## 💼 What I Built

This project is entirely developed by me — from planning to deployment. Here's what I worked on:

### ✅ Backend (Node.js + Express + MongoDB):
- Designed and implemented a RESTful API using Express
- Built a `Reminder` model using Mongoose to store all data
- Added robust validations using Joi (`reminderValidation.js`)
- Created routes and controller logic to:
  - Schedule reminders
  - Send SMS/Email if the scheduled time is already due
  - Mark reminders as `sent` after successful delivery
- Built `scheduler.js`:
  - Runs in the background every 10 seconds
  - Sends pending reminders when their time is reached
  - Updates status automatically in MongoDB
- Integrated:
  - **Email Service** using NodeMailer
  - **SMS Service** via custom provider or Twilio

### ✅ Frontend (React + Vite + Tailwind CSS):
- Designed a beautiful, responsive dashboard UI
- Connected frontend with backend using Axios
- Built forms to submit reminders
- Fetched and displayed all reminders from MongoDB
- Showed each reminder's type (Email/SMS/Both), message, scheduled time, and delivery status

---

## ✨ Features

- 📩 Email, SMS or Both Reminder Options
- ⏰ Automatic delivery using background scheduler
- ✅ Real-time "Sent" status update
- 🎯 REST API for integration with other apps
- 📊 Dashboard to view and manage reminders
- 🔐 Clean code and modular file structure

---

## 🛠 Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, MongoDB, Joi  
**Others:** Cron Jobs, Nodemailer, SMS API (like Twilio)

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reminder-scheduler.git
cd reminder-scheduler
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
# App
PORT=5000
NODE_ENV=development

# JWT for Auth
JWT_SECRET=chaiorme

# MongoDB
MONGODB_URI=mongodb:27017/remind-me-later

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-mail@gmail.com
EMAIL_PASS=your-app-password  //on 2-step-verification on you email and genrate app password 

# Msg91 SMS
MSG91_AUTH_KEY=your_msg91-acc-auth-key
SENDER_ID=your-genrated-sender-id
ROUTE=4

```

Start the server:

```bash
cd ../server
npm run dev
```


### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```


## 🧪 API Endpoints

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| POST   | `/api/reminders/create`   | Create a new reminder   |
| GET    | `/api/reminders/reminders`| Get all reminders       |

---

## 📸 Screenshots


![Dashboard View](./client/public/screenshots/dashboard.png)
*Main dashboard displaying all reminders*

---

## 🧠 What I Learned

- Handling real-time background jobs using Node cron
- Designing full-stack apps with async service layers
- Structuring a clean and modular project architecture
- Integrating and validating external services like Email and SMS APIs
- Creating user-friendly UIs with Tailwind CSS and React

---

## 🔮 Future Improvements

- Add user login & auth (JWT-based)
- Schedule recurring reminders
- Store delivery logs and failure reports

---

## 🙋‍♂️ About Me

👋 Hi, I’m **Aaradhana**, a Computer Engineering student passionate about full-stack development and smart automation.  
This project was developed as part of my learning and showcases my ability to build real-world applications from scratch.

Feel free to connect:  
🔗 [GitHub](https://github.com/Aa-ra-dhana)  
📧 [Email](mailto:aaradhanaparmar55@gmail.com)  
📱 [LinkedIn](www.linkedin.com/in/aaradhana-parmar-6a45b0259)

---

## 📜 License

This project is licensed under the MIT License.  
Feel free to use and extend it in your own projects!

---
