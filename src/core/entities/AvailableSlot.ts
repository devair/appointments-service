import { Doctor } from "./Doctor"

export class AvailableSlot {

    id?: number
    createdAt: Date
    doctorId: number
    doctor: Doctor
    startTime: Date
    endTime: Date
    isAvailable: boolean
    version: number

    constructor() { }

    static assingObject({ doctor, startTime, endTime, isAvailable }): AvailableSlot {
        const newAvailableSlot = new AvailableSlot()        

        Object.assign(newAvailableSlot, {
            doctor, startTime, endTime, isAvailable
        })
        newAvailableSlot.doctorId = doctor?.id

        this.validations(newAvailableSlot)

        return newAvailableSlot
    }

    static validations(slot: AvailableSlot): void {
        const { startTime, endTime } = slot

        if(startTime && endTime && startTime >= endTime){
            throw new Error('End Time should be greater then Start Time') 
        }

        const now = Date.now()
        if(startTime && now > new Date(startTime).getTime()){
            throw new Error('It is not possible to schedule times in the past. Please select a date and time from now onwards') 
        }

    }
}
