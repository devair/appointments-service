import { DataSource } from "typeorm"
import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { AvailableSlotEntity } from "../../infra/datasource/typeorm/entities/AvailableSlotEntity"
import { IAvailableSlotsRepository } from "../../ports/IAvailableSlotsRepository"
import { IListAvailableSlotsUseCase } from "../../core/usesCase/IListAvailableSlotsUseCase"
import { AvailableSlotsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AvailableSlotsRepositoryPostgres"

export class ListAvailableSlotsUseCase implements IListAvailableSlotsUseCase {

    private availableSlotsRepository: IAvailableSlotsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.availableSlotsRepository = new AvailableSlotsRepositoryPostgres(this.dataSource.getRepository(AvailableSlotEntity))
    }
    
    async execute(id: number): Promise<AvailableSlot[]> {        
        const slots = await this.availableSlotsRepository.findByDoctorId(id)

        /*
        const output = slots.map((elem) => ({
            id: elem.id,
            name: elem.name,               
            email: elem.email,
            crm: elem.crm            
        }))*/

        return slots
    }

}