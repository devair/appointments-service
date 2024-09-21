import { OutputDoctorAvailableSlotDto } from "./dots/IDoctorAvailableSlot"

export interface IListAvailableSlotsUseCase{    
    execute(doctorId: number): Promise<OutputDoctorAvailableSlotDto[]> 
}