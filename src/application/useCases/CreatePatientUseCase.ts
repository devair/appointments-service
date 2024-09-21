import { DataSource } from "typeorm"
import { InputCreatedPatientDto, OutputCreatedPatientDto } from "../../core/usesCase/dots/ICreatedPatientDto"
import { Patient } from "../../core/entities/Patient"
import { PatientsRepositoryPostgres } from "../../infra/datasource/typeorm/postgres/PatientsRepositoryPostgres"
import { ICreatePatientUseCase } from "../../core/usesCase/ICreatePatientUseCase"
import { PatientEntity } from "../../infra/datasource/typeorm/entities/PatientEntity"
import { IPatientsRepository } from "../../ports/IPatientsRepository"

export class CreatePatientUseCase implements ICreatePatientUseCase {

    private patientsRepository: IPatientsRepository

    constructor(
        private dataSource: DataSource        
    ) {
        this.patientsRepository = new PatientsRepositoryPostgres(this.dataSource.getRepository(PatientEntity))
    }
    
    async execute(input: InputCreatedPatientDto ): Promise<OutputCreatedPatientDto> {  
        const {name, email, cpf } = input
        const patient = new Patient(name, email, cpf)
        
        const patientFound = await this.patientsRepository.findByEmail(email)
        if (patientFound) {
            throw new Error(`Patient already exists with these parameters: email`)
        }
        
        const createdPatient = await this.patientsRepository.create(patient)
        
        return {
            id: createdPatient.id,
            name: createdPatient.name,
            email: createdPatient.email,
            cpf: createdPatient.cpf
        }
    }
}