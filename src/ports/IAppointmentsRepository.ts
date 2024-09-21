import { Appointment } from "../core/entities/Appointment"

export interface IAppointmentsRepository {    
    create(slot: Appointment): Promise<Appointment>      
}