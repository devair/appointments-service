import { DataSource } from "typeorm"
import { Doctor } from "../../core/entities/Doctor"
import { ICreateDoctorUseCase } from "../../core/usesCase/ICreateUserUseCase"
import { IDoctorsRepository } from "../../ports/IDoctorsRepository"
import { InputCreatedDoctorDto, OutputCreatedDoctorDto } from "../../core/usesCase/dots/ICreatedDoctorDto"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"

export class CreateDoctorUseCase implements ICreateDoctorUseCase {

    private doctorsRepository: IDoctorsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.doctorsRepository = new DoctorsRepositoryPostgres(this.dataSource.getRepository(DoctorEntity))
    }
    
    async execute(input: InputCreatedDoctorDto ): Promise<OutputCreatedDoctorDto> {  
        const {name, email, crm } = input
        const doctor = new Doctor(name, email, crm)
        
        const doctorFound = await this.doctorsRepository.findByEmail(email)
        if (doctorFound) {
            throw new Error(`Doctor already exists with these parameters: email`)
        }
        
        const createdDoctor = await this.doctorsRepository.create(doctor)
        
        return {
            id: createdDoctor.id,
            name: createdDoctor.name,
            email: createdDoctor.email,
            crm: createdDoctor.crm
        }
    }
}