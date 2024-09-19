import { Router } from 'express'
import { DoctosApi } from '../api/DoctosApi'

export const doctorsRouter = (api: DoctosApi)=> {
    const router = Router()    
    router.get('/', (req,res)=>api.list(req,res))
    return router
}