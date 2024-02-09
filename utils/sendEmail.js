const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ayushkumar0352@gmail.com',
            pass: 'pddkhbdmouhnduac'
        }
    });

    const mailOptions = {
        from: 'ayushkumar0352@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click <a href=${process.env.FRONTEND_URL}/verify/${token}>here</a> to verify your email. or copy and paste this link on your browser ${process.env.FRONTEND_URL}/verify/${token}</p>`
    };
    await transporter.sendMail(mailOptions);
}
