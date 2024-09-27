import { Doctor } from "./Doctor"

export class AvailableSlot {

    id?: number
    createdAt: Date
    doctorId: number
    doctor: Doctor
    private _startTime: Date
    private _endTime: Date
    isAvailable: boolean
    version: number

    constructor() { }

    get startTime(){
        return this._startTime
    }
    set startTime(startTime: Date){
        if(typeof(startTime)==='string'){
            this._startTime = new Date(startTime)
        }
    }

    get endTime(){
        return this._endTime
    }

    set endTime(endTime: Date){
        if(typeof(endTime)==='string'){
            this._endTime = new Date(endTime)
        }
    }

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
        let { startTime, endTime } = slot

        if(typeof(startTime)==='string'){
            startTime = new Date(startTime)
        }
        
        if(typeof(endTime)==='string'){
            endTime = new Date(endTime)
        }

        if(startTime && endTime && startTime >= endTime){
            throw new Error('End Time should be greater then Start Time') 
        }

        const now = Date.now()
        if(startTime && now > new Date(startTime).getTime()){
            throw new Error('It is not possible to schedule times in the past. Please select a date and time from now onwards') 
        }

    }
}
