const Enquiry = require("../model/enquiry.model");
const sendEmail = require("../utils/sendEmail");

exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, birthDate, birthTime, birthPlace, plan } = req.body;

        // Validate input fields
        if (!name || !email || !birthDate || !birthTime || !birthPlace || !plan) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save enquiry data to the database
        const newEnquiry = new Enquiry({
            name, email, birthDate, birthTime, birthPlace, plan
        });
        await newEnquiry.save();

        // Email Content
        const subject = "Career Guidance Enquiry Received";
        const message = `
            <h3>Hello ${name},</h3>
            <p>Thank you for submitting your enquiry for career guidance.</p>
            <p><strong>Plan Selected:</strong> ${plan}</p>
            <p><strong>Birth Date:</strong> ${birthDate}</p>
            <p><strong>Birth Time:</strong> ${birthTime}</p>
            <p><strong>Birth Place:</strong> ${birthPlace}</p>
            <p>Our team will reach out to you soon.</p>
            <br>
            <p>Best regards,<br>Career Guidance Team</p>
        `;

        // Send Email
        const emailSent = await sendEmail(email, subject, message);

        if (!emailSent) {
            return res.status(500).json({ message: "Enquiry saved but email failed to send" });
        }

        res.status(201).json({ message: "Enquiry submitted successfully, email sent!" });
    } catch (err) {
        console.error("Error in submitting enquiry:", err);
        res.status(500).json({ message: "Server Error" });
    }
}
