import { AvailableSlot } from "../core/entities/AvailableSlot"

export interface IAvailableSlotsRepository {    
    create(slot: AvailableSlot): Promise<AvailableSlot>
    findByDoctorId (doctorId: number):Promise<AvailableSlot[]>
    findById(id: number): Promise<AvailableSlot | undefined>    
}