import { Router } from 'express'
import { DoctosApi } from '../api/DoctosApi'

export const doctorsRouter = (api: DoctosApi)=> {
    const router = Router()    
    router.get('/', (req,res)=>api.list(req,res))

    router.get('/available-slots/:id', (req,res)=>api.availableSlots(req,res))

    router.post('/available-slots/', (req,res)=>api.createSlot(req,res))

    router.post('/appointments/', (req,res)=>api.createAppointment(req,res))


    return router
}