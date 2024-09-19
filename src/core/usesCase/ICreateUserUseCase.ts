import { InputCreatedDoctorDto, OutputCreatedDoctorDto } from "./dots/ICreatedDoctorDto"

export interface ICreateDoctorUseCase{    
    execute(input: InputCreatedDoctorDto ): Promise<OutputCreatedDoctorDto> 
}