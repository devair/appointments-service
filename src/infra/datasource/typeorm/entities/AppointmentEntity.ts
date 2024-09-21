import { EntitySchema } from "typeorm"
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart "
import { Appointment } from "../../../../core/entities/Appointment"

const dateType = process.env.NODE_ENV === "test" ? 'datetime' : 'timestamp with time zone'


export const AppointmentEntity = new EntitySchema<Appointment>({
    name: "appointments",
    columns: {
        ...BaseColumnSchemaPart,
        doctorId: {
            name: 'doctor_id',
            type: Number,
            unique: false
        },
        patientId: {
            name: 'patient_id',
            type: Number,
            unique: false
        },
        availableSlotId : {
            name: 'available_slot_id',
            type: Number,
            unique: false
        },       
        status: {
            type: 'varchar',
            unique: false
        },
    },    
    relations: {
        availableSlot: {
            type: 'many-to-one',
            target: 'available_slots',   
            joinColumn: {
                name: 'available_slot_id'
            }
        },
        doctor: {
            type: 'many-to-one',
            target: 'doctors',   
            joinColumn: {
                name: 'doctor_id'
            }
        },
        patient: {
            type: 'many-to-one',
            target: 'patients',   
            joinColumn: {
                name: 'patient_id'
            }
        },
    },
})