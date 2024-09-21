import { Doctor } from "../../core/entities/Doctor"
import { IFindDoctorByEmailUseCase } from "../../core/usesCase/IFindDoctorByEmailUseCase"

export class FindDoctorByEmailController {

    constructor(
        public findDoctorByEmailUseCase: IFindDoctorByEmailUseCase
    ) { }

    async handler(email: string): Promise<Doctor> {
        return await this.findDoctorByEmailUseCase.execute(email)
    }

}