import { Doctor } from "./Doctor"

export class AvailableSlot{

    id?: number
    createdAt: Date
    doctorId: number
    
    constructor(
        public doctor: Doctor,
        public startTime: Date, 
        public endTime: Date,         
        public isAvailable: boolean        
    ){
        this.doctorId = doctor.id
    }    
}
