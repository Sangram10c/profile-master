const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing cors

const app = express();
const port = 3000;

// Enable CORS for all domains
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chougulesangram3@gmail.com', // Your email
        pass: 'sangram@2770',   // Your email password or app-specific password
    }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { fname, lname, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'chougulesangram3@gmail.com', // Your email
        subject: subject,
        text: `First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email: ' + error.message);
        }
        res.status(200).send('Email sent successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
