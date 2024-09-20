import { Doctor } from "../entities/Doctor"

export interface IFindDoctorByEmailUseCase{    
    execute(email: string): Promise<Doctor | undefined> 
}