import { Patient } from "../core/entities/Patient"

export interface IPatientsRepository {
    create (doctor: Patient): Promise<Patient>
    findByEmail (email: string):Promise<Patient | undefined >    
    findById(id: Number): Promise<Patient | undefined >
}