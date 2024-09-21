import { OutputCreatedDoctorDto } from "../../core/usesCase/dots/ICreatedDoctorDto"
import { IListDoctorsUseCase } from "../../core/usesCase/IListDoctorsUseCase"

export class ListDoctorsController {

    constructor(
        public listDoctorsUseCase: IListDoctorsUseCase
    ) { }

    async handler(): Promise<OutputCreatedDoctorDto[]> {
        return await this.listDoctorsUseCase.execute()
    }

}