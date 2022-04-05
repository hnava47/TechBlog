const {
    Blog,
    Comment,
    User
} = require('../models');

module.exports = {
    viewAllBlogs: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        try {
            const allBlogsData = await Blog.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['firstName', 'lastName']
                            }
                        ]
                    }
                ],
                order: [
                    ['updatedAt', 'DESC'],
                    ['comments', 'updatedAt', 'DESC']
                ]
            });

            const allBlogs = allBlogsData.map(blog => blog.get({ plain: true }));

            res.render('home', {
                allBlogs,
                user: req.session.user
            });
        } catch (error) {
            res.json(error);
        }
    },
    viewUserBlogs: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        try {
            const userBlogData = await Blog.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['firstName', 'lastName']
                            }
                        ]
                    }
                ],
                where: { creatorId: req.session.user.id },
                order: [
                    ['updatedAt', 'DESC'],
                    ['comments', 'updatedAt', 'DESC']
                ]
            });

            const allBlogs = userBlogData.map(blog => blog.get({ plain: true }));

            res.render('dashboard', {
                allBlogs,
                user: req.session.user
            });
        } catch (error) {
            res.json(error);
        }
    },
    viewBlog: async (req, res) => {
        try {
            const getBlog = await Blog.findByPk(req.params.blogId);

            res.json(getBlog);
        } catch (error) {
            res.json(error);
        }
    },
    createBlog: async (req, res) => {
        const { content, title } = req.body;

        if (!content) {
            return res.status(401).json({ error: 'Must include a message' });
        }

        try {
            const blogData = await Blog.create({
                creatorId: req.session.user.id,
                title,
                content
            });

            const blog = blogData.get({ plain: true });

            blog.user = {
                firstName: req.session.user.firstName,
                lastName: req.session.user.lastName
            };

            res.json(blog);
        } catch (error) {
            res.json(error);
        }
    },
    updateBlog: async (req, res) => {
        const { title, content } = req.body;

        try {
            await Blog.update(
                {
                    content,
                    title
                },
                { where: { id: req.params.blogId } }
            );

            const updatedBlog = await Blog.findByPk(req.params.blogId);

            res.json(updatedBlog);
        } catch (error) {
            res.json(error);
        }
    },
    deleteBlog: async (req, res) => {
        const { blogId } = req.params;

        try {
            const deleteBlog = await Blog.findByPk(blogId);

            await Blog.destroy({
                where: { id: blogId }
            });

            res.json(deleteBlog);
        } catch (error) {
            res.json(error);
        }
    }
};
