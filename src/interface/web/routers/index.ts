import { Router } from "express"
import { DoctosApi } from "../api/DoctosApi"
import { doctorsRouter } from "./doctors.router"
import { DataSource } from "typeorm"
import { authenticateToken } from "./Middleware"
export const router = (dataSource: DataSource) => {
        
    const router = Router()
    const doctorsApi = new DoctosApi(dataSource)
    router.use('/doctors', authenticateToken, doctorsRouter(doctorsApi))

    return router
}
