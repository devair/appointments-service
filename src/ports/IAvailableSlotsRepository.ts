import { AvailableSlot } from "../core/entities/AvailableSlot"

export interface IAvailableSlotsRepository {    
    create(slot: AvailableSlot): Promise<AvailableSlot>    
    findById(id: number): Promise<AvailableSlot | undefined>  
    listAvailableSlotsByDoctorId (doctorId: number):Promise<AvailableSlot[]>  
    updateSlot(id: number, slot: AvailableSlot):Promise<AvailableSlot>
}