import { Sequelize } from "sequelize";
import { confobj } from "./db.conf.js";

const sequelize = new Sequelize(confobj)

!(async function() {
    {
        try {
            sequelize.authenticate()
            return sequelize;
        } catch (error) {
            console.error(error.message);
        }
    }
})()




export { sequelize }