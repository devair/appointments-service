import { Request, Response } from "express"
import { DataSource } from "typeorm"
import { ListDoctorsUseCase } from "../../../application/useCases/ListDoctorsUseCase"
import { ListDoctorsController } from "../../../communication/controller/ListDoctorsController"

export class DoctosApi {

    constructor(
        private readonly dataSource: DataSource
    ) { }

    async list(request: Request, response: Response): Promise<Response> {

        const listDoctorsUseCase = new ListDoctorsUseCase(this.dataSource)
        const listDoctorsController = new ListDoctorsController(listDoctorsUseCase)

        try {
            const data = await listDoctorsController.handler()
            response.contentType('application/json')
            return response.status(200).json(data)
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }        
}
