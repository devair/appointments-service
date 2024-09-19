import { AvailableSlot } from "./AvailableSlot"
import { Doctor } from "./Doctor"
import { Patient } from "./Patient"

export class Appointment {
    id?: Number
    createdAt: Date
    doctorId: Number
    patientId: Number
    availableSlotId: Number    
    constructor(
        public doctor: Doctor,
        public patient: Patient,
        public availableSlot: AvailableSlot,
        public appointmentTime: Date,
        public status: string,        
    ){
        this.doctorId = doctor.id
        this.patientId = patient.id
        this.availableSlotId = availableSlot.id
    }
}