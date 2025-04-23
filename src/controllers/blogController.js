const { validationResult } = require('express-validator');
const { Blog } = require('../models');
const { Op } = require('sequelize');
const slugify = require('slugify');

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const offset = (page - 1) * limit;

        const blogs = await Blog.findAndCountAll({
            where: { active_status: true },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        res.json({
            status: 'success',
            data: {
                rows: blogs.rows,
                total: blogs.count,
                currentPage: page,
                totalPages: Math.ceil(blogs.count / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blogs'
        });
    }
};

// Get single blog
exports.getSingleBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({
            where: {
                [Op.or]: [
                    { ar_slug: slug },
                    { en_slug: slug }
                ],
                active_status: true
            }
        });

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Get related blogs
        const relatedBlogs = await Blog.findAll({
            where: {
                id: { [Op.ne]: blog.id },
                active_status: true
            },
            order: sequelize.literal('RAND()'),
            limit: 10
        });

        res.json({
            status: 'success',
            data: {
                blog,
                blogs: relatedBlogs
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blog'
        });
    }
};

// Create blog
exports.createBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { ar_title, en_title, ar_text, en_text, main_image } = req.body;

        // Generate slugs
        const ar_slug = slugify(ar_title, { lower: true });
        const en_slug = slugify(en_title, { lower: true });

        const blog = await Blog.create({
            ar_title,
            en_title,
            ar_text,
            en_text,
            ar_slug,
            en_slug,
            main_image,
            active_status: true
        });

        res.status(201).json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating blog'
        });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { ar_title, en_title, ar_text, en_text, main_image, active_status } = req.body;

        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Generate new slugs if title changed
        const ar_slug = ar_title ? slugify(ar_title, { lower: true }) : blog.ar_slug;
        const en_slug = en_title ? slugify(en_title, { lower: true }) : blog.en_slug;

        await blog.update({
            ar_title: ar_title || blog.ar_title,
            en_title: en_title || blog.en_title,
            ar_text: ar_text || blog.ar_text,
            en_text: en_text || blog.en_text,
            ar_slug,
            en_slug,
            main_image: main_image || blog.main_image,
            active_status: active_status !== undefined ? active_status : blog.active_status
        });

        res.json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating blog'
        });
    }
};

// Toggle blog status
exports.toggleBlogStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);
        
        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        // Toggle the active_status
        await blog.update({
            active_status: !blog.active_status
        });

        res.json({
            status: 'success',
            data: {
                message: blog.active_status ? 'Blog enabled successfully' : 'Blog disabled successfully',
                blog
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling blog status'
        });
    }
}; 