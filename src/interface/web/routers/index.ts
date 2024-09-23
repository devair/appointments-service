import { Router } from "express"
import { DoctosApi } from "../api/DoctosApi"
import { doctorsRouter } from "./doctors.router"
import { DataSource } from "typeorm"
import { authenticateToken } from "./Middleware"
import { IAppointmentQueueAdapterOUT } from "../../../core/messaging/IAppointmentQueueAdapterOUT"
export const router = (dataSource: DataSource, publisher: IAppointmentQueueAdapterOUT) => {
        
    const router = Router()
    const doctorsApi = new DoctosApi(dataSource, publisher)
    router.use('/doctors', authenticateToken, doctorsRouter(doctorsApi))

    return router
}
