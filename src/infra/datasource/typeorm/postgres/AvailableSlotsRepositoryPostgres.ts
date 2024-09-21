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
    
    async findById(id: number): Promise<AvailableSlot | undefined> {
        return await this.repository.findOne({ where: { id } })
    }
    
    async listAvailableSlotsByDoctorId(doctorId: number): Promise<AvailableSlot[]> {
        const all = await this.repository.createQueryBuilder("available_slots")
        .innerJoinAndSelect('available_slots.doctor', 'doctor')        
        .where('available_slots.doctor_id = :doctorId', { doctorId })
        .andWhere('available_slots.is_available = :isAvailable', { isAvailable: true })
        .getMany()

        return all
    }
}