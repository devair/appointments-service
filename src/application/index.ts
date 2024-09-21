import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from '../infra/datasource/typeorm'
import { CreateDoctorUseCase } from './useCases/CreateDoctorUseCase'
import { DoctorCreatedQueueAdapterIN } from '../infra/messaging/DoctorCreatedQueueAdapterIN'
import { router } from '../interface/web/routers'
import { PatientCreatedQueueAdapterIN } from '../infra/messaging/PatientCreatedQueueAdapterIN'
import { CreatePatientUseCase } from './useCases/CreatePatientUseCase'

dotenv.config()

const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''

const app = express()
app.disable("x-powered-by")
app.use(express.json())

AppDataSource.initialize().then(async (datasource) => {

    const createDoctorUseCase = new CreateDoctorUseCase(datasource)
    const doctorCreatedConsumer = new DoctorCreatedQueueAdapterIN(rabbitMqUrl, createDoctorUseCase)
    await doctorCreatedConsumer.consume()

    const createPatientUseCase = new CreatePatientUseCase(datasource)
    const patientCreatedQueueAdapterIN = new PatientCreatedQueueAdapterIN(rabbitMqUrl, createPatientUseCase)
    await patientCreatedQueueAdapterIN.consume()  

    app.use('/api/v1', router(datasource))

    app.listen(3334,'0.0.0.0', () => {
        console.log(`Appointments Service listening  on port 3334`)
    })
}).catch(error => console.log(error))
