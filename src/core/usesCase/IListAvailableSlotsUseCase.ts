import { AvailableSlot } from "../entities/AvailableSlot"

export interface IListAvailableSlotsUseCase{    
    execute(doctorId: number): Promise<AvailableSlot[]> 
}