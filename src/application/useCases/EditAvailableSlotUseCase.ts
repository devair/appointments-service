import { DataSource } from "typeorm"
import { InputEditAvailableSlotDto, OutputEditAvailableSlotDto } from "../../core/usesCase/dots/IEditAvailableSlotDto"
import { IEditAvailableSlotUseCase } from "../../core/usesCase/IEditAvailableSlotUseCase"
import { IAvailableSlotsRepository } from "../../ports/IAvailableSlotsRepository"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { Role } from "../../core/entities/Roles"
import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { AvailableSlotsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AvailableSlotsRepositoryPostgres"
import { AvailableSlotEntity } from "../../infra/datasource/typeorm/entities/AvailableSlotEntity"

export class EditAvailableSlotUseCase implements IEditAvailableSlotUseCase {

    private availableSlotsRepository: IAvailableSlotsRepository

    constructor(private dataSource: DataSource) {
        this.availableSlotsRepository = new AvailableSlotsRepositoryPostgres(this.dataSource.getRepository(AvailableSlotEntity))
    }

    async execute(input: InputEditAvailableSlotDto): Promise<OutputEditAvailableSlotDto> {
        const { user, id, startTime, endTime, isAvailable } = input

        if (user?.role != Role.DOCTOR) {
            throw new Error(`Only doctors can create slot times`)
        }

        const doctorsRepository = new DoctorsRepositoryPostgres(this.dataSource.getRepository(DoctorEntity))
        const doctorFound = await doctorsRepository.findByEmail(user.email)

        if (!doctorFound) {
            throw new Error(`Doctor not found`)
        }

        const slotFound = await this.availableSlotsRepository.findById(id)

        const slot = AvailableSlot.assingObject({ doctor: doctorFound, startTime, endTime, isAvailable})
        slot.isAvailable = isAvailable

        if (!slotFound) {
            throw new Error(`Slot Time not found`)
        }
        
        const slotUpdated = await this.availableSlotsRepository.updateSlot(id, slot)

        return {
            id: slotUpdated.id,
            doctorId: slotUpdated.doctorId,
            startTime: slotUpdated.startTime,
            endTime: slotUpdated.endTime,
            isAvailable: slotUpdated.isAvailable
        }
    }
}