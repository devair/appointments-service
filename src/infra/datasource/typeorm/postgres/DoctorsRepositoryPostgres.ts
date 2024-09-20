import { Repository } from "typeorm"
import { IDoctorsRepository } from "../../../../ports/IDoctorsRepository"
import { Doctor } from "../../../../core/entities/Doctor"
export class DoctorsRepositoryPostgres implements IDoctorsRepository {

    constructor(
        private readonly repository: Repository<Doctor>
    ) { }

    async create(doctor: Doctor): Promise<Doctor> {
        const newDoctor = this.repository.create(doctor)
        const doctorCreated = await this.repository.save(newDoctor)
        return doctorCreated
    }

    async findById(id: number): Promise<Doctor | undefined> {
        return await this.repository.findOne({ where: { id } })
    }

    async list(): Promise<Doctor[]> {
        const all = await this.repository.find()
        return all
    }

    async findByEmail(email: string): Promise<Doctor | undefined> {
        const doctor = this.repository.findOne({ where: { email } })
        return doctor
    }
}