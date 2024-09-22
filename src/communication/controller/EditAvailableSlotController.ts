import { InputEditAvailableSlotDto, OutputEditAvailableSlotDto } from "../../core/usesCase/dots/IEditAvailableSlotDto"
import { IEditAvailableSlotUseCase } from "../../core/usesCase/IEditAvailableSlotUseCase"

export class EditAvailableSlotController {

    constructor(
        public edittAvailableSlotUseCase: IEditAvailableSlotUseCase
    ) { }

    async handler(input: InputEditAvailableSlotDto): Promise<OutputEditAvailableSlotDto> {
        return await this.edittAvailableSlotUseCase.execute(input)
    }

}