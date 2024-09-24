### Email summarization UI

UI for email summarization.

This project contains two versions of the Email Inbox UI: one written in vanilla JavaScript (located in the root directory) and another version built with React (inside the `email-inbox` folder).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Vanilla JavaScript Version](#vanilla-javascript-version)
  - [React Version](#react-version)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)

## Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (for React version)
- [npm](https://www.npmjs.com/) (comes with Node.js) (for React version)
- [Python](https://www.python.org/) (for the Flask backend)
- [Flask](https://flask.palletsprojects.com/) installed in your Python environment

## Project Structure
```
/email-summarization-ui
│
├── /email-inbox/           # React version of the project
│   ├── /public/
│   ├── /src/
│   ├── package.json
│   └── README.md
│
├── /assets/                # Shared assets (images, CSS)
├── index.html              # Entry point for vanilla JavaScript version
├── core.ts                 # Main TypeScript file for vanilla version
└── README.md               # This file
```

## Setup Instructions

### Vanilla JavaScript Version
The vanilla JavaScript version is a basic implementation using HTML, CSS, and TypeScript.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/email-summarization-ui.git
   cd email-summarization-ui
   ```

2. Open the `index.html` file in the root directory with a web browser to run the vanilla JavaScript version.

> **Note**: This version does not include a build process, so you can just open `index.html` directly in the browser.

### React Version

The React version of the project is inside the `email-inbox` folder. You will need `Node.js` and `npm` installed to run this version.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/email-summarization-ui.git
   cd email-summarization-ui/email-inbox
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

> **Note**: The app will run on `http://localhost:3000` by default.

## Backend Setup

Both versions of the project require a Flask backend for serving email threads and providing summarization functionality. Ensure that your Flask backend is running on `http://localhost:5000` for email threads and summarization.

1. Clone or navigate to your Flask backend repository.

2. Follow instruction in their readme

3. Run the Flask backend:
   ```bash
   python app.py
   ```

Make sure that both the email threads API (`/all_email_threads`) and the summarization API (`/summarize`) are running on port 5000.

## Running the Application

1. **Start the backend Flask server**:
   Make sure the Flask server is running as per the [Backend Setup](#backend-setup).

2. **Start the React development server** (if you're using the React version):
   ```bash
   cd email-inbox
   npm run dev
   ```

3. If you're using the **vanilla JavaScript version**, just open the `index.html` in your browser.

### Endpoints

- **Email threads** should be fetched from `http://localhost:5000/all_email_threads`.
- **Summarization** should be posted to `http://localhost:8000/summarize`.

---

Feel free to report any issues or contribute to the project.
```