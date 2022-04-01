const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        creatorId: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        blogId: {
            type: DataTypes.UUID,
            references: {
                model: 'blog',
                key: 'id'
            }
        },
        comment: {
            type: DataTypes.String,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;
