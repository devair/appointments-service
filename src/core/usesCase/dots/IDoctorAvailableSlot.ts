export interface OutputDoctorAvailableSlotDto {    
    id: number
    doctorId: number
    name: string
    email: string
    crm: string
    startTime: Date
    endTime: Date
    isAvailable: boolean
}
