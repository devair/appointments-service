import { InputCreateSlotDto, OutputCreateSlotDto } from "./dots/ICreateSlotDto"

export interface ICreateSlotUseCase {  
    execute(input: InputCreateSlotDto ): Promise<OutputCreateSlotDto> 
}
