import { Repository } from "typeorm"
import { IAppointmentsRepository } from "../../../../ports/IAppointmentsRepository"
import { Appointment } from "../../../../core/entities/Appointment"


export class AppointmentsRepositoryPostgres implements IAppointmentsRepository {

    constructor(
        private readonly repository: Repository<Appointment>
    ) { }

    async create(slot: Appointment): Promise<Appointment> {
        const newAppointment = this.repository.create(slot)
        const appointmentCreated = await this.repository.save(newAppointment)
        return appointmentCreated
    }
}