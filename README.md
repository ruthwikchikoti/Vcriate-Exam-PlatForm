# Exam Platform

An interactive online examination platform built with React.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup](#setup)
5. [Running the Application](#running-the-application)
6. [Project Structure](#project-structure)


## Project Overview

The Exam Platform is a web-based application designed to facilitate online examinations. It provides a secure and user-friendly environment for conducting timed assessments with features like fullscreen mode, violation warnings, and immediate result calculation.

## Features

- User authentication and details collection
- Timed exams with a countdown timer
- Multiple-choice questions (MCQ) support
- Fullscreen mode to prevent cheating
- Violation warnings for leaving the exam window
- Immediate result calculation and display
- Email service for sending exam results
- Responsive design for various devices

## Technologies Used

- React.js
- Node.js
- Express.js
- Nodemailer
- CSS3
- HTML5

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
```shell
    git clone https://github.com/your-username/exam-platform.git cd exam-platform
```

2. Install dependencies:
```shell
    npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
EMAIL_USER=your-email@gmail.com 
EMAIL_PASS=your-email-password
```


4. Set up the backend:
```shell
    cd backend
    npm install
```


## Running the Application

1. Start the backend server:  `cd server node server.js`


2. In a new terminal, start the React application:
```shell
    npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/src`: Contains the React application source code
- `/components`: React components (e.g., ExamWindow, Timer, MCQuestions)
- `/styles`: CSS files for styling components
- `/public`: Public assets and HTML template
- `/server`: Backend server code

