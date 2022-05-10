import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'; 

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "22db76b6b68a45",
      pass: "21178c62a25fcf"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Edson Carlos <edsoncros3002@gmail.com>',
            subject: subject,
            html: body,
        });
    }
}