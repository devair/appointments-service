import { AvailableSlot } from "../../core/entities/AvailableSlot"
import { IListAvailableSlotsUseCase } from "../../core/usesCase/IListAvailableSlotsUseCase"

export class ListAvailableSlotsController {

    constructor(
        public listAvailableSlotsUseCase: IListAvailableSlotsUseCase
    )
    {}

    async handler(id: number): Promise<AvailableSlot[]> {        
        return await this.listAvailableSlotsUseCase.execute(id);       
    }
    
}