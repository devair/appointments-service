import { Repository } from "typeorm"
import { Patient } from "../../../../core/entities/Patient"
import { IPatientsRepository } from "../../../../ports/IPatientsRepository"

export class PatientsRepositoryPostgres implements IPatientsRepository {

    constructor(
        private readonly repository: Repository<Patient>
    ) { }

    async create(doctor: Patient): Promise<Patient> {
        const newDoctor = this.repository.create(doctor)
        const doctorCreated = await this.repository.save(newDoctor)
        return doctorCreated
    }

    async findById(id: number): Promise<Patient | undefined> {
        return await this.repository.findOne({ where: { id } })
    }

    async findByEmail(email: string): Promise<Patient | undefined> {
        const doctor = this.repository.findOne({ where: { email } })
        return doctor
    }
}