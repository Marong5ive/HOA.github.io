const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Email logic
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configure your email provider (Gmail, Outlook, etc.)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-school-email@gmail.com',
            pass: 'your-app-password' 
        }
    });

    const mailOptions = {
        from: email,
        to: 'admin@hoa-academy.edu',
        subject: `New Inquiry from ${name}`,
        text: `Message: ${message} \n\nFrom: ${name} (${email})`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send("Error sending message.");
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Message sent successfully! We will contact you soon.");
        }
    });
});

app.listen(3000, () => {
    console.log('HOA Website running on http://localhost:3000');
});