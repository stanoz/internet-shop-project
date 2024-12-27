const nodemailer = require('nodemailer')

async function sendEmail(receivers, subject, message ) {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: USERNAME,
            pass: PASSWORD
        }
    })

    if (!receivers || receivers.length === 0) {
        throw new Error('No receivers were provided!')
    }
    if (!message) {
        throw new Error('No message was provided!')
    }
    if (!subject) {
        throw new Error('No subject was provided!')
    }

    for (const receiver of receivers) {
        if (!receiver.name || !receiver.email) {
            console.error('Invalid receiver format:', receiver);
            continue
        }

        const mailOptions = {
            from: 'clothes-shop@project.com',
            to: `${receiver.name} <${receiver.email}>`,
            replyTo: 'clothes-shop@project.com',
            subject: subject,
            text: message
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${receiver.name} <${receiver.email}>:`, info.response);
        } catch (err) {
            console.error(`Failed to send email to ${receiver.name} <${receiver.email}>:`, err.message);
            throw err
        }
    }

    console.log('---------All emails processed---------');
}

module.exports = {sendEmail}