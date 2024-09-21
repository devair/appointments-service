import { DataSource } from "typeorm"
import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { AvailableSlotEntity } from "../../infra/datasource/typeorm/entities/AvailableSlotEntity"
import { IAvailableSlotsRepository } from "../../ports/IAvailableSlotsRepository"
import { IListAvailableSlotsUseCase } from "../../core/usesCase/IListAvailableSlotsUseCase"
import { AvailableSlotsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AvailableSlotsRepositoryPostgres"
import { OutputDoctorAvailableSlotDto } from "../../core/usesCase/dots/IDoctorAvailableSlot"

export class ListAvailableSlotsUseCase implements IListAvailableSlotsUseCase {

    private availableSlotsRepository: IAvailableSlotsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.availableSlotsRepository = new AvailableSlotsRepositoryPostgres(this.dataSource.getRepository(AvailableSlotEntity))
    }
    
    async execute(id: number): Promise<OutputDoctorAvailableSlotDto[]> {        
        const slots = await this.availableSlotsRepository.listAvailableSlotsByDoctorId(id)

        const output = slots.map((elem) => ({
            id: elem.id,
            name: elem.doctor.name,                           
            email: elem.doctor.email,
            crm: elem.doctor.crm,
            startTime: elem.startTime,            
            endTime: elem.endTime,
            isAvailable: elem.isAvailable            
        }))

        return output
    }

}