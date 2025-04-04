const nodemailer = require('nodemailer');

const sendEmail = async (userEmail, sub, msg) => {
    const transport = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        sender: true,
        secure: true,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.APP_PASS
        },
        socketTimeout: 60000,
    });

    try {
        // Send email to both user and your  email
        const info = await transport.sendMail({
            from: `"Dhairya Jain" <${process.env.EMAIL_ID}>`,
            to: [userEmail, process.env.MY_EMAIL],  // Sending email to both user and you
            subject: sub,
            html: msg
        });

        console.log('Message sent:', info.messageId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = sendEmail;
