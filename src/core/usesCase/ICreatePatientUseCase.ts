import { InputCreatedPatientDto, OutputCreatedPatientDto } from "./dots/ICreatedPatientDto"

export interface ICreatePatientUseCase{    
    execute(input: InputCreatedPatientDto ): Promise<OutputCreatedPatientDto> 
}