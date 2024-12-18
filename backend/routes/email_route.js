const express = require('express');
const router = express.Router();
const { sendEmail } = require('../middlewares/email_system');

router.post('/send-email', async (req, res) => {
    const { to, html } = req.body;
    await sendEmail(to, html);
    res.send('Email sent successfully');
    });

module.exports = router;
