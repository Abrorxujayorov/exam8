import "dotenv/config"

const confobj = {
    dialect: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false
};

export { confobj }