import { OutputDoctorAvailableSlotDto } from "../../core/usesCase/dots/IDoctorAvailableSlot"
import { IListAvailableSlotsUseCase } from "../../core/usesCase/IListAvailableSlotsUseCase"

export class ListAvailableSlotsController {

    constructor(
        public listAvailableSlotsUseCase: IListAvailableSlotsUseCase
    ) { }

    async handler(id: number): Promise<OutputDoctorAvailableSlotDto[]> {
        return await this.listAvailableSlotsUseCase.execute(id)
    }

}