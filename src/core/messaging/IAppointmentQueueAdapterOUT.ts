export interface IAppointmentQueueAdapterOUT {
 
    publish(queue: string, message: string): Promise<void>
    
}