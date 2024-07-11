# Edypros Frontend

## Overview
Edypros is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The frontend is built using ReactJS with Vite, providing a fast, dynamic, and responsive user interface for an engaging learning experience.

## Technologies Used
- ReactJS
- Vite
- Redux
- CSS
- TailwindCSS
- Axios

## Features
### For Students:
- **Homepage**: Introduction to the platform, links to course list and user details.
- **Course List**: Browse all available courses with descriptions and ratings.
- **Wishlist**: Save desired courses.
- **Cart Checkout**: Complete course purchases.
- **Course Content**: Access course materials, including videos and PDFs.
- **User Details**: View and edit personal account information.

### For Instructors:
- **Dashboard**: Overview of courses, ratings, and feedback.
- **Insights**: Detailed metrics on course performance.
- **Course Management**: Create, update, delete courses, and manage content and pricing.
- **Profile Management**: View and edit account details.

### Payment Integration:
- **Razorpay Payment Gateway**: Integrated for secure transactions, currently in test mode.

## Getting Started
### Prerequisites
- Node.js
- npm (or yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shahfaiz-07/Edypros_Frontend.git
   cd Edypros_Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following variable:

```env
VITE_RAZORPAY_KEY=your_razorpay_key
```

4. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

## Deployment
The frontend is deployed on Vercel. Visit [Edypros Frontend](https://edypros-frontend.vercel.app/) to see the live application.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.