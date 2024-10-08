const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
  const { userEmail, userName, score, totalQuestions } = req.body;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vcriate React Assessment Results</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #61dafb; color: #282c34; padding: 10px; text-align: center; }
        .content { padding: 20px 0; }
        .footer { background-color: #282c34; color: #61dafb; text-align: center; padding: 10px; font-size: 0.8em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vcriate React Assessment Results</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          <p>Thank you for completing the Vcriate React Assessment. We appreciate your time and effort in showcasing your React skills.</p>
          <p>Here are your results:</p>
          <ul>
            <li>Score: ${score} out of ${totalQuestions}</li>
            <li>Percentage: ${((score / totalQuestions) * 100).toFixed(2)}%</li>
          </ul>
          <p>This assessment evaluated your understanding of key React concepts, including:</p>
          <ul>
            <li>Component-based architecture</li>
            <li>State and props management</li>
            <li>Hooks and lifecycle methods</li>
            <li>JSX syntax and rendering</li>
            <li>React ecosystem and best practices</li>
          </ul>
          <p>We encourage you to continue enhancing your React skills. Here are some resources that might be helpful:</p>
          <ul>
            <li><a href="https://reactjs.org/docs/getting-started.html">Official React Documentation</a></li>
            <li><a href="https://react.dev/">React Dev</a></li>
            <li><a href="https://www.freecodecamp.org/news/tag/react/">FreeCodeCamp React Articles</a></li>
          </ul>
          <p>If you have any questions about your results or would like further feedback, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Vcriate Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 Vcriate. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Your Vcriate React Assessment Results',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});