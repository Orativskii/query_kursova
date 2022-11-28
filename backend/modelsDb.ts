import sequelize from './sequelize'
import {DataTypes} from "sequelize";

export const users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
});

export const tests = sequelize.define('tests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ownerId: {type: DataTypes.INTEGER, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    guid: {type: DataTypes.STRING, allowNull: false},
});

export const queries = sequelize.define('queries', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    query: {type: DataTypes.STRING, allowNull: false},
    options: {type: DataTypes.STRING, allowNull: false},
    testId: {type: DataTypes.INTEGER, allowNull: false},
});

export const results = sequelize.define('results', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    testId: {type: DataTypes.STRING, allowNull: false},
    result: {type: DataTypes.STRING, allowNull: false},
    percentage: {type: DataTypes.STRING, allowNull: false},
});


