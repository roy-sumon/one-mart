# One Mart

One Mart is a full-stack web application designed for booking repair services and purchasing products, complete with user authentication, dashboard management, discussion forum, and payment gateway integration.

## Project Structure

```
one-mart/
├── backend/    # Express.js & MongoDB backend server
└── frontend/   # React + Vite frontend client
```

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   DB_USER=your_db_username
   DB_PASS=your_db_password
   storeID=your_sslcommerz_store_id
   storePasswd=your_sslcommerz_store_passwd
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example`:
   ```env
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_sender_id
   VITE_appId=your_app_id
   VITE_IMAGE_HOSTING_KEY=your_imgbb_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
