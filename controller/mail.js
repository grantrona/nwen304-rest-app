const mailer = require('nodemailer');

/**
 * Sends an email to the given email address with the given details.
 * 
 * @param {string} email Email address to send to
 * @param {string} subject Email subject line
 * @param {string} text Email content
 */
function sendEmail(email, subject, text){
    const transporter = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "nwen304.chirper@gmail.com",
            pass: "pxkylysimwldwlri"
        },
    });

    console.log("Transporter done");
    transporter.sendMail({
        from: "nwen304.chirper@gmail.com",
        to: email,
        subject: subject,
        text: text,
    }).then(() => {
        console.log("Successful email");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = { sendEmail };