import { AvailableSlot } from "./AvailableSlot"
import { Doctor } from "./Doctor"
import { Patient } from "./Patient"

export class Appointment {
    id?: number
    createdAt: Date
    doctorId: number
    patientId: number
    availableSlotId: number    
    
    constructor(
        public doctor: Doctor,
        public patient: Patient,
        public availableSlot: AvailableSlot,        
        public status: string,        
    ){
        this.doctorId = doctor.id
        this.patientId = patient.id
        this.availableSlotId = availableSlot.id
    }
}