const axios = require('axios')

const emailSendUrl = 'https://api.sendgrid.com/v3/mail/send';

const EmailType = {
 WELCOME_EMAIL: 'd-59f06c5a2791473bb52170705cf2956e'
}

module.exports.sendTemplateEmail = (toEmail, template) => {
    if (!EmailType[template]) {
      return Promise.reject(new Error('Template not defined'))
    }
    const email = {
     from: {
      email: 'john@qcrf.org',
      name: 'EuchreStats',
     },
    template_id: EmailType[template],
    personalizations: [{
      to: [{
       email: toEmail,
      }]
     }],
    }
    return axios({
      method: 'post',
      url: emailSendUrl,
      headers: {
       Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      data: email,
    })
}
module.exports.EmailType = EmailType