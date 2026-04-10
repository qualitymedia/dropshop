# DropShop

DropShop is a responsive, single-page e-commerce application built with vanilla web technologies on the frontend and an Express server on the backend.

## Tech Stack
- **Frontend**: Vanilla HTML / CSS / JavaScript (Component-based architecture)
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)

## Directory Structure
The repository is set up as a monolithic application. The backend Express server natively serves the frontend assets:
- `/frontend`: Contains all static assets, CSS styling, and component Javascript files. 
- `/backend`: Contains the Express server, API routing functions, validation, and database models. 

## Getting Started

1. **Install Dependencies**
   Navigate into the backend directory and install the necessary packages:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend/` directory. Use the provided `.env.example` file as a reference. You must provide a valid `MONGO_URI` and a secure `JWT_SECRET`.

3. **Running the App**
   Start the development server from the root directory by running:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

## Architecture Note
To simplify cloud deployments on ephemeral systems like Render or Vercel, image uploads from the Admin panel are encoded directly into Base64 strings and stored inside the MongoDB documents. This eliminates the need for third-party cloud storage buckets like AWS S3 or Cloudinary.
