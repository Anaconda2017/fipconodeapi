const { validationResult } = require('express-validator');
const { ContactUsForm } = require('../models');
const nodemailer = require('nodemailer');

// Get all contact form submissions
exports.getContactForms = async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        
        if (status) {
            where.status = status;
        }

        const forms = await ContactUsForm.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            status: 'success',
            data: forms
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching contact forms'
        });
    }
};

// Get single contact form submission
exports.getSingleContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await ContactUsForm.findByPk(id);

        if (!form) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact form submission not found'
            });
        }

        res.json({
            status: 'success',
            data: form
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching contact form submission'
        });
    }
};

// Submit contact form
exports.submitContactForm = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, message } = req.body;

        const form = await ContactUsForm.create({
            name,
            email,
            phone,
            message,
            status: 'pending'
        });

        // Send email notification
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_FROM,
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        res.status(201).json({
            status: 'success',
            data: form
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error submitting contact form'
        });
    }
};

// Update contact form status
exports.updateContactFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const form = await ContactUsForm.findByPk(id);
        if (!form) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact form submission not found'
            });
        }

        await form.update({ status });

        res.json({
            status: 'success',
            data: form
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating contact form status'
        });
    }
}; 