import { InputCreateAppointmentDto, OutputCreateAppointmentDto } from "./dots/ICreateAppointmentDto"

export interface ICreateAppointmentUseCase {
    execute(input: InputCreateAppointmentDto): Promise<OutputCreateAppointmentDto>
}