import { EntitySchema } from "typeorm"
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart"
import { Doctor } from "../../../../core/entities/Doctor"

export const DoctorEntity = new EntitySchema<Doctor>({
    name: "doctors",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
            unique: false
        },        
        email: {
            type: 'varchar',
            unique: true
        },        
        crm: {
            type: 'varchar',
            unique: false
        },
    }
})