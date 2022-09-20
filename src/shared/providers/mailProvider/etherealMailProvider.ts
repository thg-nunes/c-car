import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { EtherialMailProtocol } from './protocol';

class EtherialMailProvider implements EtherialMailProtocol {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transPorter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transPorter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail(to: string, subject: string, path: string, variables: any): Promise<void> {
    const fileContentTemplate = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(fileContentTemplate);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'C-car.rentals@hotmail.com',
      subject,
      html: templateHTML,
    });

    console.log(message.messageId);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export { EtherialMailProvider };
