const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Blog extends Model {};

Blog.init(
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
        title: {
            type: DataTypes.String,
            allowNull: false
        },
        content: {
            type: DataTypes.String,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'blog'
    }
);

module.exports = Blog;
