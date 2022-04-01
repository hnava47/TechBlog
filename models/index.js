const Blog = require('./Blog');
const Comment = require('./Comment');
const User = require('./User');

Blog.belongsTo(User, {
    foreignKey: 'creatorId'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'creatorId'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blogId'
});

User.hasMany(Blog, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

module.exports = {
    Blog,
    Comment,
    User
};
