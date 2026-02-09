# Tender X: Procurement Management System

**Tender X** is an enterprise-grade, web-based Procurement Management System (PMS) designed to streamline and automate the complex lifecycle of supply chain interactions. By bridging the gap between organizations (Buyers) and their vendors (Suppliers), Tender X eliminates manual inefficiencies, ensures transparency, and facilitates data-driven decision-making.

In traditional procurement, the process from identifying a need to paying a supplier is often fragmented across emails, spreadsheets, and paper documents. Tender X centralizes this entire workflow into a single, intuitive platform. It handles everything from raising Requests for Quotation (RFQs), receiving and evaluating competitive bids, issuing Purchase Orders (PO), to processing Invoices and managing payments.

Built with scalability, security, and user experience in mind, Tender X is the ideal solution for businesses looking to modernize their procurement operations, reduce costs, and build stronger supplier relationships.

---

## 🌐 Connect with Me

I'm open to collaborations and opportunities! Feel free to connect:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-handle)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://your-portfolio.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---

## 🎯 Key Features & User Roles

Tender X provides distinct portals for different stakeholders, ensuring secure and relevant access to information.

### 🏢 Buyer / Admin Portal
The command center for procurement managers.
*   **RFQ Management**: Create detailed requests with specifications, quantities, and deadlines.
*   **Bid Comparison**: Automatically collate incoming bids and compare them side-by-side based on price available.
*   **Vendor Management**: Onboard, verify, and manage a database of trusted suppliers.
*   **Order Processing**: One-click generation of Purchase Orders from winning bids.
*   **Analytics Dashboard**: Visual insights into spending trends, active tenders, and pending actions.

### 🚚 Supplier Portal
A dedicated interface for vendors to find and win business.
*   **Opportunity Discovery**: View a real-time feed of relevant RFQs open for bidding.
*   **Bid Submission**: Securely submit quotes and technical proposals.
*   **Order Tracking**: Receive and acknowledge Purchase Orders instantly.
*   **Invoice Generation**: Create and submit digital invoices directly against POs.
*   **Status Updates**: Real-time notifications for bid acceptance/rejection.

---

## 🔄 System Workflow

1.  **Need Identification (Buyer)**: The process starts when the Buyer creates a **Request for Quotation (RFQ)** specifying the items needed.
2.  **Bidding Phase (Supplier)**: Suppliers view the RFQ and submit their **Bids**, including pricing and delivery terms.
3.  **Evaluation & Award (Buyer)**: The Buyer reviews the bids, compares them, and **Accepts** the best offer.
4.  **Contracting (System)**: Upon bid acceptance, a **Purchase Order (PO)** is automatically generated and sent to the Supplier.
5.  **Fulfillment & Billing (Supplier)**: The Supplier delivers the goods and raises an **Invoice** against the PO.
6.  **Payment Processing (Manual)**: Payments are processed **offline** (e.g., Bank Transfer, Check) outside the system. The Buyer explicitly marks the invoice as "Paid" in the system once the transaction is complete.
7.  **Order Closure**: The workflow concludes when the payment status is updated and the order is marked as complete.

---

## 🔍 Technical Highlights
*   **Responsive Architecture**: Fully responsive UI built with Tailwind CSS, accessible on desktops, tablets, and mobiles.
*   **Real-time Notifications**: Integrated alerts using React Hot Toast for user actions (Bid submitted, PO received, etc.).
*   **Secure Authentication**: robust JWT (JSON Web Token) implementation for session management and route protection.
*   **Scalable Backend**: RESTful API structure with Express.js and MongoDB, designed to handle growing data and traffic.

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
