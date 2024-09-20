import { Repository } from "typeorm"
import { AvailableSlot } from "../../../../core/entities/AvailableSlot"
import { IAvailableSlotsRepository } from "../../../../ports/IAvailableSlotsRepository"


export class AvailableSlotsRepositoryPostgres implements IAvailableSlotsRepository {

    constructor(
        private readonly repository: Repository<AvailableSlot>
    ) { }

    async create(slot: AvailableSlot): Promise<AvailableSlot> {
        const newSlot = this.repository.create(slot)
        const slotCreated = await this.repository.save(newSlot)
        return slotCreated
    }

    async findByDoctorId(id: number): Promise<AvailableSlot[]> {
        return await this.repository.find({ where: { doctorId: id }})
    }
}