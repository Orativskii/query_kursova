import {Sequelize} from "sequelize";

export default new Sequelize('QUERY_DATABASE', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})
