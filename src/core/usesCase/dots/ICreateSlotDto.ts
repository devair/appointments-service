export interface OutputCreateSlotDto {
    id: Number
    doctorId: Number
    startTime: Date
    endTime: Date
    isAvailable: boolean
}

export interface InputCreateSlotDto {
    doctorEmail: string
    startTime: Date
    endTime: Date
    isAvailable: boolean
}