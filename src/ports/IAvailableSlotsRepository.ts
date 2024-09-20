import { AvailableSlot } from "../core/entities/AvailableSlot"

export interface IAvailableSlotsRepository {
    
    findByDoctorId (id: number):Promise<AvailableSlot[]>
    
}