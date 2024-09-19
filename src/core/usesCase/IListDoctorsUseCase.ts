import { OutputCreatedDoctorDto } from "./dots/ICreatedDoctorDto"

export interface IListDoctorsUseCase{    
    execute(): Promise<OutputCreatedDoctorDto[]> 
}