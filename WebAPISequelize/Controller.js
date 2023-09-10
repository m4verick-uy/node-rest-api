import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import { databaseConfig, portForHTTP } from './config.js';
import DbContext from './DataAccess/DbContext.js';
import router from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use('/', router);
const sequelize = new Sequelize(databaseConfig);

app.listen(portForHTTP, () => {
    console.log("Server is running on port", portForHTTP);
});
