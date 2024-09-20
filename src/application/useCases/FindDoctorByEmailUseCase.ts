import { DataSource } from "typeorm"
import { IFindDoctorByEmailUseCase } from "../../core/usesCase/IFindDoctorByEmailUseCase"
import { OutputCreatedDoctorDto } from "../../core/usesCase/dots/ICreatedDoctorDto"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"
import { IDoctorsRepository } from "../../ports/IDoctorsRepository"
import { Doctor } from "../../core/entities/Doctor"

export class FindDoctorByEmailUseCase implements IFindDoctorByEmailUseCase {

    private doctorsRepository: IDoctorsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.doctorsRepository = new DoctorsRepositoryPostgres(this.dataSource.getRepository(DoctorEntity))
    }
    
    async execute(email: string): Promise<Doctor | undefined> {        
        const doctor = await this.doctorsRepository.findByEmail(email)
        if(!doctor){
            throw new Error(`Doctor not found`)
        }
        
        return doctor
    }

}