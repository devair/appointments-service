import { InputCreateSlotDto, OutputCreateSlotDto } from "../../core/usesCase/dots/ICreateSlotDto"
import { ICreateSlotUseCase } from "../../core/usesCase/ICreateSlotUseCase"

export class CreateSlotController {

    constructor(
        public createSlotUseCase: ICreateSlotUseCase
    )
    {}

    async handler(input: InputCreateSlotDto): Promise<OutputCreateSlotDto> {        
        return await this.createSlotUseCase.execute(input)       
    }
    
}