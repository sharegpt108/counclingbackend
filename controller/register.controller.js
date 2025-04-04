const Register = require('../model/register.model');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    try{
        const { name, studentClass, pincode, email, mobile, role } = req.body;

if (!name || !studentClass || !pincode || !email || !mobile || !role) {
    return res.status(400).json({ message: "All fields are required" });
}

        const newRegister = new Register({
            name, studentClass, pincode, email, mobile, role
        });
        await newRegister.save();
        const subject = "Registration Successful";
        const message = `
            <h3>Hello ${name},</h3>
            <p>Thank you for registering with us.</p>
            <p><strong>Role Selected:</strong> ${role}</p>
            <p><strong>Class:</strong> ${studentClass}</p>
            <p><strong>Pincode:</strong> ${pincode}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p>Our team will reach out to you soon.</p>
            <br>
            <p>Best regards,<br>Career Guidance Team</p>
        `;
        const emailSent = await sendEmail(email, subject, message);
        if(!emailSent){
            return res.status(500).json({message: "Registration saved but email failed to send"});
        }
        res.status(201).json({message: "Registration submitted successfully, email sent!"});

    }catch(err) {
        console.error("Error in submitting enquiry:", err);
        res.status(500).json({ message: "Server Error" });
    }
};