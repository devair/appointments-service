export interface OutputCreateAppointmentDto {
    id: number
    doctorId: number
    startTime: Date
    endTime: Date
    isAvailable: boolean
}

export interface InputCreateAppointmentDto {
    user: any
    patientId: number
    doctorId: number
    slotId: number    
}