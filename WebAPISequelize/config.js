export const databaseConfig = {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'goose710',
    database: process.env.DB_DATABASE || 'node_rest_api',
};

export const portForHTTP = process.env.PORT || 3000;
