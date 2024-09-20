import { DataSource } from "typeorm"
import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { InputCreateSlotDto, OutputCreateSlotDto } from "../../core/usesCase/dots/ICreateSlotDto"
import { ICreateSlotUseCase } from "../../core/usesCase/ICreateSlotUseCase"
import { AvailableSlotEntity } from "../../infra/datasource/typeorm/entities/AvailableSlotEntity"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { AvailableSlotsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AvailableSlotsRepositoryPostgres"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"
import { IAvailableSlotsRepository } from "../../ports/IAvailableSlotsRepository"


export class CreateSlotUseCase implements ICreateSlotUseCase {

    private availableSlotsRepository: IAvailableSlotsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.availableSlotsRepository = new AvailableSlotsRepositoryPostgres(this.dataSource.getRepository(AvailableSlotEntity))
    }
    
    async execute(input: InputCreateSlotDto ): Promise<OutputCreateSlotDto> {  
        const { doctorEmail, startTime, endTime, isAvailable} = input

        const doctorsRepository = new DoctorsRepositoryPostgres(this.dataSource.getRepository(DoctorEntity))
        
        const doctorFound = await doctorsRepository.findByEmail(doctorEmail)
        if (!doctorFound) {
            throw new Error(`Doctor not found`)
        }
        
        const newSlot = new AvailableSlot(doctorFound,startTime,endTime,isAvailable)        
        const createdSlot = await this.availableSlotsRepository.create(newSlot)

        return {
            id: createdSlot.id,            
            doctorId: createdSlot.doctorId,
            startTime: createdSlot.startTime,
            endTime: createdSlot.endTime,
            isAvailable: createdSlot.isAvailable            
        }
    }
}