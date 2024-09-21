import { EntitySchema } from "typeorm"
import { AvailableSlot } from "../../../../core/entities/AvailableSlot"
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart"


const dateType = process.env.NODE_ENV === "test" ? 'datetime' : 'timestamp with time zone'


export const AvailableSlotEntity = new EntitySchema<AvailableSlot>({
    name: "available_slots",
    columns: {
        ...BaseColumnSchemaPart,
        doctorId: {
            name: 'doctor_id',
            type: Number,
            unique: false
        },
        startTime: {
            name: "start_time",
            type: dateType    
        },
        endTime: {
            name: "end_time",
            type: dateType            
        },
        isAvailable : {
            name: "is_available",
            type: "boolean",
            default: true
        }
    },    
    relations: {
        doctor: {
            type: 'many-to-one',
            target: 'doctors',   
            joinColumn: {
                name: 'doctor_id'
            }
        },
    },
})