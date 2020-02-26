// see usage: https://www.npmjs.com/package/dotenv
require('dotenv').config();

const mongoConnectionString = process.env.DB_URL;
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: mongoConnectionString } });
const nodemailer = require('nodemailer');

const mail = require("./helpers/mail"); //mail.send


agenda.define('send email', (job, done) => {

  // Initialize
  let email_client = "roaldjap@gmail.com";
  let templateToRender = "email-sample";
  let firstName = "Jap";
  let policyID= "test"
  let policyName = "Example 1";
  let localURL = "#";


  // send the mail - see also helpers/mail.js
  mail.send({
    to: email_client, // receiver
    filename: templateToRender, // see template @ email-templates/email-sample.pug
    subject: 'Expiration Date', // custom_subject
    firstName,
    policyID, // custom variables 
    policyName,
    localURL
  });

  console.log("Message sent to: " + email_client);
  done();
});

(async function() {
	await agenda.start();

	await agenda.every('1 minute', 'send email');
})();
