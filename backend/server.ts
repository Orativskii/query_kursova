import app from './app'
import sequelize from './sequelize'
import express from 'express';

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(3001);
        app.use(express.json())
    } catch (e) {
        console.log(e);
    }
}

start()
    .then(() => console.log('server started'));


