import { Doctor } from "./Doctor"

export class AvailableSlot {

    id?: number
    createdAt: Date
    doctorId: number
    doctor: Doctor
    startTime: Date
    endTime: Date
    isAvailable: boolean

    constructor() { }

    static assingObject({ doctor, startTime, endTime, isAvailable }): AvailableSlot {
        const newAvailableSlot = new AvailableSlot()

        Object.assign(newAvailableSlot, {
            doctor, startTime, endTime, isAvailable
        })
        newAvailableSlot.doctorId = doctor?.id
        return newAvailableSlot
    }
}
