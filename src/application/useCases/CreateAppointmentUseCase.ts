import { DataSource, QueryRunner } from "typeorm"
import { IAppointmentsRepository } from "../../ports/IAppointmentsRepository"
import { ICreateAppointmentUseCase } from "../../core/usesCase/ICreateAppointmentUseCase"
import { AppointmentEntity } from "../../infra/datasource/typeorm/entities/AppointmentEntity"
import { AppointmentsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AppointmentsRepositoryPostgres"
import { InputCreateAppointmentDto, OutputCreateAppointmentDto } from "../../core/usesCase/dots/ICreateAppointmentDto"
import { Role } from "../../core/entities/Roles"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { Appointment } from "../../core/entities/Appointment"
import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { AvailableSlotsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/AvailableSlotsRepositoryPostgres"
import { AvailableSlotEntity } from "../../infra/datasource/typeorm/entities/AvailableSlotEntity"
import { Patient } from "../../core/entities/Patient"
import { PatientsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/PatientsRepositoryPostgres"
import { PatientEntity } from "../../infra/datasource/typeorm/entities/PatientEntity"

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {

    private appointmentsRepository: IAppointmentsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.appointmentsRepository = new AppointmentsRepositoryPostgres(this.dataSource.getRepository(AppointmentEntity))
    }
    
    async execute(input: InputCreateAppointmentDto ): Promise<OutputCreateAppointmentDto> {  
        const { user, patientId, doctorId, slotId } = input

        if(user?.role !== Role.PATIENT) {
            throw new Error(`Only patients can create appointments`)
        }

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const doctorsRepository = new DoctorsRepositoryPostgres(queryRunner.manager.getRepository(DoctorEntity))        
            const doctorFound = await doctorsRepository.findById(doctorId)
            if (!doctorFound) {
                throw new Error(`Doctor not found`)
            }

            const patientsRepository = new PatientsRepositoryPostgres(queryRunner.manager.getRepository(PatientEntity))
            const patientFound = await patientsRepository.findById(patientId)
            if (!patientFound) {
                throw new Error(`Patient not found`)
            }

            const availableSlotsRepository = new AvailableSlotsRepositoryPostgres(queryRunner.manager.getRepository(AvailableSlotEntity))
            const availableSlot = await availableSlotsRepository.findById(slotId)
            if (!availableSlot || !availableSlot.isAvailable) {
                throw new Error(`Available slot not found or not available`)
            }
            
            await availableSlotsRepository.updateSlot(availableSlot.id, { isAvailable: false, version: availableSlot.version })
            
            const newAppointment = new Appointment(doctorFound, patientFound, availableSlot, 'Ocupado')
            const createdAppointment = await this.appointmentsRepository.create(newAppointment)

            await queryRunner.commitTransaction()

            return {
                id: createdAppointment.id,            
                doctorId: createdAppointment.doctorId,
                startTime: createdAppointment.availableSlot.startTime,
                endTime: createdAppointment.availableSlot.endTime,
                isAvailable: createdAppointment.availableSlot.isAvailable            
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }
}
