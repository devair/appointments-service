import { InputEditAvailableSlotDto, OutputEditAvailableSlotDto } from "./dots/IEditAvailableSlotDto"

export interface IEditAvailableSlotUseCase {
    execute( input: InputEditAvailableSlotDto): Promise<OutputEditAvailableSlotDto>
}