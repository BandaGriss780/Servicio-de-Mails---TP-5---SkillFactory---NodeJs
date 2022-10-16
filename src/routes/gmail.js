import {Router} from "express"
import { sendGmail } from "../utils/gmail.js"
import fs from "fs"

const router = Router()

router
    .get("/", (req, res) => {
        const data = fs.readFileSync("mail.json", "utf-8")
        res.json(JSON.parse(data))
    })

    .post("/", async (req, res) => {
        const mail = req.body
        const { from, to, subject, text } = mail

        if(!from || !to || !subject || !text ) {
            return res.status(400).send("Faltan datos")
        }

        const sentMail = await sendGmail({ from, to, subject, text })

        if(sentMail) {
            if(fs.existsSync("mail.json")) {
                const mails = JSON.parse(fs.readFileSync("mail.json", "utf-8"))
                mails.push(sentMail)
                fs.writeFileSync("mail.json", `${JSON.stringify(mails)}\n`)
            } else {
                fs.writeFileSync("mail.json", `${JSON.stringify([sentMail])}\n`)
            }
        }

        res.status(201).send("Mail enviado exitosamente!")
    })

export default router