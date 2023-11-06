import 'dotenv/config'
import express from 'express'
import { sequelize } from './utils/db.connection.js'
import { User } from './user/models/user.models.js'
import { signup } from './user/authorization/register.js'
import { productorder, userRouter } from './user/routers/userRouter.js'
import { login } from './user/authorization/login.js'
import { productRouter } from './admins/adminWork.js'
import path from 'path'



const port = process.env.PORT

async function startserver () {
    try {
        const app = express()
        await sequelize.sync({alter: true})
        app.use(express.json())
        app.use((req, res, next) => {
            req.sequelize = sequelize
            next()
        })
        
        app.use('/users', signup);
        app.use('/users', login);
        app.use("/users", userRouter);
        app.use(productRouter);
        app.use(express.static(path.join(path.resolve(),'uploads')))
        app.use(productorder);


        app.listen(port, () => console.log(`Server is runnig`))
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}
startserver()

