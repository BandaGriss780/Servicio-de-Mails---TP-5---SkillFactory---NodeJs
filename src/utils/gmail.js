import nodemailer from "nodemailer"


const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user: "", // Gmail account
      pass: "" // Gmail password
    }
})

export const sendGmail = async (mail) => {
    const sentGmail = await gmailTransporter.sendMail(mail)

    console.log(`Message sent:${sentGmail.messageId}`)
    

    return sentGmail
}
