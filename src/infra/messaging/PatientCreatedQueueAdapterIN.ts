import amqpCallback from "amqplib/callback_api"
import { InputCreatedPatientDto } from "../../core/usesCase/dots/ICreatedPatientDto"
import { ICreatePatientUseCase } from "../../core/usesCase/ICreatePatientUseCase"
import { QueueNames } from "../../core/messaging/QueueNames"

export class PatientCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private createPatientUseCase: ICreatePatientUseCase
    ) { }

    async consume() {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err
                }
                channel.assertQueue(QueueNames.PATIENT_REGISTRATION, { durable: true })
                channel.consume(QueueNames.PATIENT_REGISTRATION, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                 
                            console.log(JSON.parse(msg.content.toString()))           
                            const doctor: InputCreatedPatientDto = JSON.parse(msg.content.toString())

                            console.log('Patient - Received:', doctor)

                            // Aqui o servico persiste e publica na mesma transacao para o proximo canal
                            await this.createPatientUseCase.execute(doctor)
                            channel.ack(msg)
                        } catch (error) {
                            console.error('Processing error', error.message)
                            // Rejeita a mensagem e reencaminha para a fila
                            channel.nack(msg)
                        }
                    }
                }, { noAck: false })
            })
        })
    }

}