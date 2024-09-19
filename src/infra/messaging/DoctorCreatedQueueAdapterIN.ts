import amqpCallback from "amqplib/callback_api"
import { ICreateDoctorUseCase } from "../../core/usesCase/ICreateUserUseCase"
import { QueueNames } from "./QueueNames"
import { InputCreatedDoctorDto } from "../../core/usesCase/dots/ICreatedDoctorDto"

export class DoctorCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private createDoctorUseCase: ICreateDoctorUseCase
    ) { }

    async consume() {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err;
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err;
                }
                channel.assertQueue(QueueNames.DOCTOR_REGISTRATION, { durable: true });
                channel.consume(QueueNames.DOCTOR_REGISTRATION, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                 
                            console.log(JSON.parse(msg.content.toString()))           
                            const doctor: InputCreatedDoctorDto = JSON.parse(msg.content.toString());

                            console.log('Doctor - Received:', doctor)

                            // Aqui o servico persiste e publica na mesma transacao para o proximo canal
                            await this.createDoctorUseCase.execute(doctor)
                            channel.ack(msg);
                        } catch (error) {
                            console.error('Processing error', error.message);
                            // Rejeita a mensagem e reencaminha para a fila
                            channel.nack(msg);
                        }
                    }
                }, { noAck: false })
            })
        })
    }

}