// const twilio = require('twilio')

// const accountSid = 'AC182ac8edc4420b8bcf1df5c6554951e6';
// const authToken = '[AuthToken]';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'HI THIS TRAIL MESSAGE from twilio',
//         from: '+18147071692',
//         to: '+919833296711'
//     })
//     .then(message => console.log(message.sid))
//     .done();

// the above code sent message successfully from twilio account

    // Import the Twilio module
const twilio = require('twilio');

// Your Account SID and Auth Token from twilio.com/console
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Send an SMS
client.messages.create({
    body: 'Hello from Node.js!',
    from: '+1234567890', // Your Twilio phone number
    to: '+918928877911'    // Recipient's phone number
})
.then(message => console.log(message.sid))
.catch(error => console.error(error));
