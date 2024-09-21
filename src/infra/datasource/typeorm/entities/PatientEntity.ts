import { EntitySchema } from "typeorm"
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart"
import { Patient } from "../../../../core/entities/Patient"

export const PatientEntity = new EntitySchema<Patient>({
    name: "patients",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
            unique: false
        },
        cpf: {
            type: 'varchar',
            unique: true
        },
        email: {
            type: 'varchar',
            unique: true
        }
    },    
})