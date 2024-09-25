import { DataSource } from "typeorm"
import { OutputCreatedDoctorDto } from "../../core/usesCase/dots/ICreatedDoctorDto"
import { IListDoctorsUseCase } from "../../core/usesCase/IListDoctorsUseCase"
import { DoctorEntity } from "../../infra/datasource/typeorm/entities/DoctorEntity"
import { DoctorsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/DoctorsRepositoryPostgres"
import { IDoctorsRepository } from "../../ports/IDoctorsRepository"

export class ListDoctorsUseCase implements IListDoctorsUseCase {

    private doctorsRepository: IDoctorsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.doctorsRepository = new DoctorsRepositoryPostgres(this.dataSource.getRepository(DoctorEntity))
    }
    
    async execute(): Promise<OutputCreatedDoctorDto[]> {        
        const doctors = await this.doctorsRepository.list()

        const output = doctors.map((elem) => ({
            id: elem.id,
            name: elem.name,               
            email: elem.email,
            crm: elem.crm            
        }))

        return output
    }

}