# Tender X: Procurement Management System

**Tender X** is a cutting-edge, web-based procurement management solution designed to revolutionize the way businesses handle their supply chain and purchasing activities. Seamlessly bridging the gap between buyers and suppliers, Tender X offers a robust platform for managing the entire procurement lifecycle—from the initial Request for Quotation (RFQ) to the final Invoice generation.

Built with scalability and user experience in mind, the platform empowers organizations to automate workflows, ensure transparency in bidding processes, and make data-driven purchasing decisions. Whether you are a large enterprise looking to streamline your vendor management or a supplier aiming to expand your business opportunities, Tender X provides the tools you need to succeed in a competitive market.

---

## 🌐 Connect with Me

I'm open to collaborations and opportunities! Feel free to connect:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-handle)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://your-portfolio.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---

## 🚀 Features

### Authentication & Authorization
- **Secure Registration & Login**: JWT-based authentication for secure user access.
- **Role-Based Access Control**: Separate dashboards and functionalities for:
  - **Admin/Buyer**: Create RFQs, evaluate bids, issue POs.
  - **Supplier**: View RFQs, submit bids, track status.

### Procurement Workflow
1.  **RFQ Management**: Create, edit, and manage Requests for Quotation with detailed specifications.
2.  **Bidding System**: Suppliers can view active RFQs and submit competitive bids.
3.  **Bid Evaluation**: Buyers can compare bids and select the most suitable supplier.
4.  **Purchase Orders (PO)**: Automatically generate POs for selected bids.
5.  **Invoice Management**: Track and manage invoices for completed orders.

### Technical Highlights
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.
- **Real-time Updates**: Interactive dashboard for tracking procurement status.
- **Secure Data Handling**: MongoDB for robust data storage.

---

## 🛠️ Tech Stack

This project is built using the **MERN** stack:

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## ⚙️ Installation & Setup

### Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher) installed.
-   [MongoDB](https://www.mongodb.com/) installed or a MongoDB Atlas connection string.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tender-x
```

### 2. Backend Setup
Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id (Optional)
RAZORPAY_KEY_SECRET=your_razorpay_key_secret (Optional)
```

Start the backend server:

```bash
npm run dev
# Server should run on http://localhost:8000
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed for Razorpay):

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id (Optional)
```

Start the frontend development server:

```bash
npm run dev
# App should be accessible at http://localhost:5173
```

---

## 📂 Project Structure

```
tender-x/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Request logic
│   ├── middlewares/        # Custom middleware (Auth, etc.)
│   ├── models/             # Mongoose schemas (User, Refq, Bid, etc.)
│   ├── routes/             # API route definitions
│   ├── .env                # Environment variables
│   ├── app.js              # Server entry point
│   └── package.json        # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React Context (Auth, etc.)
    │   ├── hooks/          # Custom Hooks
    │   ├── pages/          # Application views
    │   │   ├── Auth/       # Login, Register
    │   │   ├── Home/       # Dashboard, RFQ, Bid pages
    │   │   └── LandingPage.jsx
    │   ├── utils/          # Helper functions
    │   ├── App.jsx         # Main application component
    │   └── main.jsx        # Entry point DOM rendering
    ├── .env                # Environment variables
    ├── eslint.config.js    # Linting configuration
    ├── index.html          # HTML template
    ├── package.json        # Frontend dependencies
    └── vite.config.js      # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the ISC License.
