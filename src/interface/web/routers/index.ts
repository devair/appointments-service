import { Router } from "express";
import { DoctosApi } from "../api/DoctosApi"
import { doctorsRouter } from "./doctors.router"
import { DataSource } from "typeorm"
export const router = (dataSource: DataSource) => {
        
    const router = Router()
    const doctorsApi = new DoctosApi(dataSource)
    router.use('/doctors', doctorsRouter(doctorsApi))

    return router
}
