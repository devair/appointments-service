import { Repository } from "typeorm"
import { AvailableSlot } from "../../../../core/entities/AvailableSlot"
import { IAvailableSlotsRepository } from "../../../../ports/IAvailableSlotsRepository"


export class AvailableSlotsRepositoryPostgres implements IAvailableSlotsRepository {

    constructor(
        private readonly repository: Repository<AvailableSlot>
    ) { }

    async findByDoctorId(id: number): Promise<AvailableSlot[]> {
        return await this.repository.find({ where: { doctorId: id }})
    }
}