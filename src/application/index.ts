import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from '../infra/datasource/typeorm'

dotenv.config()

const app = express()
app.disable("x-powered-by")
app.use(express.json())

AppDataSource.initialize().then(async (datasource) => {
    app.listen(3334,'0.0.0.0', () => {
        console.log(`Appointments Service listening  on port 3334`)
    })
}).catch(error => console.log(error))
