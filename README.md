# RestaurantChatbot

A modern, AI-powered restaurant chatbot web application built with React, Firebase, and Vite.  
Customers can chat to place orders, review their order history, and admins can manage all incoming orders with status updates.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Firebase Setup](#firebase-setup)
  - [Running Locally](#running-locally)
- [Testing](#testing)
- [Deployment & CI/CD](#deployment--cicd)
- [Admin Features](#admin-features)
- [Security Notes](#security-notes)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **AI Chatbot Ordering:**  
  Customers interact with a chatbot to select menu items, confirm quantities, and place orders.
- **Order Editing:**  
  Users can edit their order before checkout.
- **Order History:**  
  Users can view their past orders.
- **Admin Dashboard:**  
  Restaurant staff can log in with a username and password to view all orders, grouped by status, and update order statuses (new, in progress, declined, completed).
- **Authentication:**  
  Google Sign-In for customers; environment-based credentials for admins.
- **Responsive UI:**  
  Built with React Bootstrap for a modern, mobile-friendly experience.
- **CI/CD Ready:**  
  Includes GitHub Actions workflows for testing and deployment.

---

## Demo

**Live Demo:**  
[https://myrestaurant-chatbot.netlify.app/](https://myrestaurant-chatbot.netlify.app/)

---

## Tech Stack

- **Frontend:** React, Vite, React Bootstrap
- **Authentication:** Firebase Auth (Google Sign-In for users)
- **Database:** Firebase Firestore
- **AI:** Google Generative AI (Gemini API)
- **Testing:** Vitest, React Testing Library
- **CI/CD:** GitHub Actions

---

## Project Structure

```
src/
  App.jsx                # Main app component and routing
  main.jsx               # Entry point
  components/
    ChatForm.jsx         # Chatbot and order flow
    ChatHistory.jsx      # Chat message bubbles
    MenuCarrousel.jsx    # Menu carousel
    OrderHistory.jsx     # User order history
    Header.jsx           # Top navigation bar
    Footer.jsx           # Footer
    AdminLogin.jsx       # Admin login form
    AdminOrders.jsx      # Admin dashboard for orders
    firebase.js          # Firebase config and helpers
    ...
  assets/                # Images for menu items
  ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A Firebase project (Firestore & Auth enabled)
- Google Generative AI API key

---

### Environment Variables

Create a `.env` file in the project root with the following:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_KEY=your_google_generative_ai_key

VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_admin_password
```

**Never commit your `.env` file or service account keys to version control!**

---

### Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/).
2. **Enable Authentication** (Google Sign-In).
3. **Enable Firestore Database**.
4. **Get your Firebase config** from Project Settings → General.
5. **Set Firestore rules** (see [Security Notes](#security-notes)).

---

### Running Locally

```sh
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Testing

- All tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).
- Test files are located next to their components as `ComponentName.test.jsx`.

Run all tests:

```sh
npm test
```

---

## Deployment & CI/CD

- GitHub Actions workflow is set up for CI.
- On push to `main` or PR, tests are run automatically.
- Secrets for Firebase and admin credentials should be set in GitHub Actions secrets.

---

## Admin Features

- **Login:**  
  Visit `/admin` and log in with the username and password from your environment variables.
- **Dashboard:**  
  View all orders from all users, grouped by status.
- **Status Updates:**  
  Change order status to "in progress", "declined", or "completed".
- **Logout:**  
  Click the "Logout" button in the admin dashboard.

---

## Security Notes

- **Firestore Rules (Production Example):**

  ```plaintext
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/orders/{orderId} {
        // Allow users to read/write their own orders
        allow read, write: if request.auth != null && request.auth.uid == userId;

        // Allow admins to read/write all orders (if using Firebase Auth + custom claims)
        allow read, write: if request.auth.token.admin == true;
      }
    }
  }
  ```

- **Admin Auth:**  
  The default admin login uses environment variables and sessionStorage.  
  For production, consider using Firebase Auth with custom claims for admins.

- **Never expose your service account key or sensitive credentials.**

---

## Customization

- **Menu Items:**  
  Edit the `MENU_ITEMS` array in `ChatForm.jsx` to change menu options.
- **Branding:**  
  Update images in `src/assets/` and text in `Header.jsx` and `Footer.jsx`.
- **AI Model:**  
  The chatbot uses Google Generative AI (Gemini).  
  You can adjust the system prompt in `ChatForm.jsx`.

---

## Troubleshooting

- **Orders not showing in admin:**

  - Check Firestore rules.
  - Ensure orders are saved with `status` and `userId`.
  - Make sure you are logged in as admin.

- **Auth errors:**

  - Check your `.env` variables.
  - Make sure Firebase Auth is enabled.

- **Build/test errors:**
  - Ensure all dependencies are installed.
  - Check for missing environment variables.

---

## License

MIT

---

## Deployed Website

[https://myrestaurant-chatbot.netlify.app/](https://myrestaurant-chatbot.netlify.app/)

---

## Dependencies

- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [bootstrap](https://www.npmjs.com/package/bootstrap)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [firebase](https://www.npmjs.com/package/firebase)
- [firebase-admin](https://www.npmjs.com/package/firebase-admin)
- [framer-motion](https://www.npmjs.com/package/framer-motion)
- [generative-ai](https://www.npmjs.com/package/generative-ai)
- [react](https://www.npmjs.com/package/react)
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks)
- [react-google-button](https://www.npmjs.com/package/react-google-button)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-toastify](https://www.npmjs.com/package/react-toastify)

---

## Dev Dependencies

- [@eslint/js](https://www.npmjs.com/package/@eslint/js)
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
- [@types/react](https://www.npmjs.com/package/@types/react)
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)
- [globals](https://www.npmjs.com/package/globals)
- [jsdom](https://www.npmjs.com/package/jsdom)
- [vite](https://www.npmjs.com/package/vite)
- [vitest](https://www.npmjs.com/package/vitest)

---

**Built with ♥ by [YawoDev ©2025]**
