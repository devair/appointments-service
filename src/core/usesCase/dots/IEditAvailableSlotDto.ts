export interface InputEditAvailableSlotDto{    
    user: any
    id: number
    startTime?: Date
    endTime?: Date
    isAvailable?: boolean
}

export interface OutputEditAvailableSlotDto {
    id: number
    doctorId: number
    startTime: Date
    endTime: Date
    isAvailable: boolean
}