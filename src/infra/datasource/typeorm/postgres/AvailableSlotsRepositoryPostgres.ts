import { Repository } from "typeorm"
import { AvailableSlot } from "../../../../core/entities/AvailableSlot"
import { IAvailableSlotsRepository } from "../../../../ports/IAvailableSlotsRepository"


export class AvailableSlotsRepositoryPostgres implements IAvailableSlotsRepository {

    constructor(
        private readonly repository: Repository<AvailableSlot>
    ) { }

    async create(slot: AvailableSlot): Promise<AvailableSlot> {
        const newSlot = this.repository.create(slot)
        
        AvailableSlot.validations(newSlot);

        const conflict = await this.findExistedTime(newSlot.doctorId, newSlot.startTime, newSlot.endTime)
        if(conflict){
            throw new Error('Conflict slot time')
        }

        const slotCreated = await this.repository.save(newSlot, { reload: true })
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

    async updateSlot(id: number, slotUpdate: Partial<AvailableSlot>): Promise<AvailableSlot> {        
        
        const slotFound = await this.repository.findOne({ where: { id }, lock: { mode: 'optimistic', version: slotUpdate.version} })

        if (!slotFound) {
            throw new Error('Available slot not found');
        }

        const conflict = await this.findExistedTime(slotUpdate.doctorId, slotUpdate.startTime, slotUpdate.endTime)
        if(conflict){
            throw new Error('Conflict slot time')
        }

        // Aqui eu forcei a atualizaçao para evitar que o mesmo slot fosse reservado por mais de 1 usuário. 
        // O Typeorm incrementa a versao após a execução do método Save
        slotUpdate.version = slotFound.version + 1 
        
        this.repository.merge(slotFound, slotUpdate)

        AvailableSlot.validations(slotFound);

        return await this.repository.save(slotFound, { reload: true})
    }


    private async findExistedTime(doctorId: number, startTime: Date, endTime: Date): Promise<AvailableSlot> {
        const found = await this.repository.createQueryBuilder('available_slots')
        .where('available_slots.doctor_id = :doctorId', { doctorId })
        .andWhere('(:startTime BETWEEN available_slots.start_time AND available_slots.end_time)', { startTime })
        .orWhere('(:endTime BETWEEN available_slots.start_time AND available_slots.end_time)', { endTime })
        .orWhere('(available_slots.start_time BETWEEN :startTime AND :endTime)', { startTime, endTime })
        .orWhere('(available_slots.end_time BETWEEN :startTime AND :endTime)', { startTime, endTime })
        .getOne();

        return found
    }

}