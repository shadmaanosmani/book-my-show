const FormData = require("form-data");
const Mailgun = require("mailgun.js");

class MailgunClient {
  static async sendEmail(emails, subject, text) {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
    });
    try {
      const data = await mg.messages.create(
        "sandbox1048ed4109f642718a2b40330f47a880.mailgun.org",
        {
          from: "Mailgun Sandbox <postmaster@sandbox1048ed4109f642718a2b40330f47a880.mailgun.org>",
          to: [...emails],
          subject: subject,
          text: text,
        },
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MailgunClient;
