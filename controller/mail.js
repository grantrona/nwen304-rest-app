// const mailer = require('nodemailer');

/**
 * Sends an email to the given email address with the given details.
 * 
 * @param {string} email Email address to send to
 * @param {string} subject Email subject line
 * @param {string} text Email content
 */
function sendEmail(email, subject, text){
    const transporter = nodemailer.createTransport({
        host: "localhost",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "john",
            pass: "snow"
        },
    });

    transporter.sendMail({
        from: "chirper Support",
        to: email,
        subject: subject,
        text: text,
    }).then(() => {
        console.log("Successful email");
    }).catch((err) => {
        console.log(err);
    });
}