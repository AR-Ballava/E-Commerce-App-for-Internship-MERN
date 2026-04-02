const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification - OTP Code",
    html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        
        <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">
            
            <h2 style="color:#333;">Email Verification</h2>
            
            <p style="color:#555;">
            Thank you for registering. Please use the following OTP to verify your email address.
            </p>

            <div style="font-size:30px; letter-spacing:5px; font-weight:bold; color:#2c7be5; margin:20px 0;">
            ${otp}
            </div>

            <p style="color:#777;">
            This OTP will expire in 10 minutes.
            </p>

            <p style="font-size:12px; color:#999; margin-top:30px;">
            If you did not request this, please ignore this email.
            </p>

        </div>

        </div>
    `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;