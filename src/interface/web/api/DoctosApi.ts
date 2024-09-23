import { Request, Response } from "express"
import { DataSource } from "typeorm"
import { ListAvailableSlotsUseCase } from "../../../application/useCases/ListAvailableSlotsUseCase"
import { ListDoctorsUseCase } from "../../../application/useCases/ListDoctorsUseCase"
import { ListDoctorsController } from "../../../communication/controller/ListDoctorsController"
import { IListAvailableSlotsUseCase } from "../../../core/usesCase/IListAvailableSlotsUseCase"
import { IListDoctorsUseCase } from "../../../core/usesCase/IListDoctorsUseCase"
import { ListAvailableSlotsController } from "../../../communication/controller/ListAvailableSlotsController"
import { CreateSlotUseCase } from "../../../application/useCases/CreateSlotUseCase"
import { ICreateSlotUseCase } from "../../../core/usesCase/ICreateSlotUseCase"
import { CreateSlotController } from "../../../communication/controller/CreateSlotController"
import { CreateAppointmentUseCase } from "../../../application/useCases/CreateAppointmentUseCase"
import { ICreateAppointmentUseCase } from "../../../core/usesCase/ICreateAppointmentUseCase"
import { CreateAppointmentController } from "../../../communication/controller/CreateAppointmentController"
import { EditAvailableSlotUseCase } from "../../../application/useCases/EditAvailableSlotUseCase"
import { EditAvailableSlotController } from "../../../communication/controller/EditAvailableSlotController"
import { IEditAvailableSlotUseCase } from "../../../core/usesCase/IEditAvailableSlotUseCase"
import { InputEditAvailableSlotDto } from "../../../core/usesCase/dots/IEditAvailableSlotDto"
import { IAppointmentQueueAdapterOUT } from "../../../core/messaging/IAppointmentQueueAdapterOUT"

export class DoctosApi {

    constructor(
        private readonly dataSource: DataSource,
        private publisher: IAppointmentQueueAdapterOUT
    ) { }

    async list(request: Request, response: Response): Promise<Response> {

        const listDoctorsUseCase: IListDoctorsUseCase = new ListDoctorsUseCase(this.dataSource)
        const listDoctorsController = new ListDoctorsController(listDoctorsUseCase)

        try {
            const data = await listDoctorsController.handler()
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }    
    
    async availableSlots(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const listAvailableSlotsUseCase: IListAvailableSlotsUseCase = new ListAvailableSlotsUseCase(this.dataSource)
        const listAvailableSlotsController = new ListAvailableSlotsController(listAvailableSlotsUseCase)

        try {
            const data = await listAvailableSlotsController.handler(parseInt(id))
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }  

    async createSlot( request: Request | any, response: Response): Promise<Response>{
        const createSlotUseCase: ICreateSlotUseCase = new CreateSlotUseCase(this.dataSource)
        const createSlotController = new CreateSlotController(createSlotUseCase)
        
        const { startTime, endTime, isAvailable } = request.body
        const  user  = request.user        
        const { email } = user

        try {
            const data = await createSlotController.handler({ user, doctorEmail: email, startTime, endTime, isAvailable})
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async createAppointment( request: Request | any , response: Response): Promise<Response>{
        const createAppointmentUseCase: ICreateAppointmentUseCase = new CreateAppointmentUseCase(this.dataSource, this.publisher)
        const createAppointmentController = new CreateAppointmentController(createAppointmentUseCase)
        
        const { doctorId, patientId, slotId} = request.body
        const  user  = request?.user        
        const { email } = user
        
        try {
            const data = await createAppointmentController.handler({user, doctorId, patientId, slotId })
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async editSlots(request: Request | any, response: Response): Promise<Response> {
        const id = parseInt(request.params?.id)
        const editAvailableSlotUseCase: IEditAvailableSlotUseCase = new EditAvailableSlotUseCase(this.dataSource)
        const editAvailableSlotController = new EditAvailableSlotController(editAvailableSlotUseCase)

        const { startTime,endTime, isAvailable }: InputEditAvailableSlotDto  = request.body
        const  user  = request?.user        
        
        try {
            const data = await editAvailableSlotController.handler({ user, id, startTime,endTime, isAvailable })
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }  
}
