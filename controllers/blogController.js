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

            const allBlogs = allBlogsData.map(blog => blog.get({ plain: true }))

            res.render('home', {
                allBlogs,
                user: req.session.user
            });
        } catch (error) {
            res.json(error);
        }
    },
    viewUserBlogs: async (req, res) => {
        try {
            const userBlogs = await Blog.findAll({
                where: {
                    creatorId: req.params.userId
                }
            });

            res.json(userBlogs);
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
        const { content } = req.body;

        if (!content) {
            return res.status(401).json({ error: 'Must include a message' });
        }

        try {
            const blogData = await Blog.create({
                creatorId: req.session.user.id,
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
        const { content } = req.body;

        try {
            await Blog.update(
                { content },
                { where: { id: req.params.postId } }
            );

            const updatedBlog = await Blog.findByPk(req.params.postId);

            res.json(updatedBlog);
        } catch (error) {
            res.json(error);
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const deleteBlog = await Blog.findByPk(req.params.postId);

            await Blog.destroy({
                where: { id: req.params.postId }
            });

            res.json(deleteBlog);
        } catch (error) {
            res.json(error);
        }
    }
};
