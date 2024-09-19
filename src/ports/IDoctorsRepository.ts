import { Doctor } from "../core/entities/Doctor"

export interface IDoctorsRepository {
    create (doctor: Doctor): Promise<Doctor>
    findByEmail (email: string):Promise<Doctor | undefined >
    list(): Promise<Doctor[]>
    findById(id: Number): Promise<Doctor | undefined >
}