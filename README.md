# Rental Website

This is a simple rental website with a backend for handling form submissions.

## Features

*   **Home Page:** A welcoming landing page.
*   **Apply Now Page:** A form for rental applications.
*   **Pay Rent Page:** A form for rent payments.
*   **Contact Page:** A form for inquiries.
*   **Backend:** A Node.js and Express backend to handle form submissions and store data in an in-memory SQLite database.
*   **Form Validation:** Client-side form validation using JavaScript.
*   **Professional Styling:** A clean and professional design.

## How to Run Locally

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm)

### Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```
5.  Open your browser and navigate to `http://localhost:3000`.

## Deployment to Vercel

1.  **Sign up for a Vercel account:**
    Go to [vercel.com](https://vercel.com) and sign up for a free account.

2.  **Install the Vercel CLI:**
    ```bash
    npm install -g vercel
    ```

3.  **Login to your Vercel account:**
    ```bash
    vercel login
    ```

4.  **Deploy the application:**
    ```bash
    vercel
    ```
    Vercel will automatically detect that this is a Node.js project and configure the build settings. It will provide you with a URL to your deployed application.
