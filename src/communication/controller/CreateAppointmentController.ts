import { InputCreateAppointmentDto, OutputCreateAppointmentDto } from "../../core/usesCase/dots/ICreateAppointmentDto"
import { ICreateAppointmentUseCase } from "../../core/usesCase/ICreateAppointmentUseCase"

export class CreateAppointmentController {

    constructor(
        public createAppointmentUseCase: ICreateAppointmentUseCase
    ) { }

    handler(input: InputCreateAppointmentDto): Promise<OutputCreateAppointmentDto> {
        return this.createAppointmentUseCase.execute(input)
    }
}