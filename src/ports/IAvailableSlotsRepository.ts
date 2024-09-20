import { AvailableSlot } from "../core/entities/AvailableSlot"

export interface IAvailableSlotsRepository {
    
    create(slot: AvailableSlot): Promise<AvailableSlot>
    findByDoctorId (id: number):Promise<AvailableSlot[]>
    
}