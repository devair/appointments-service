import request from 'supertest'
import jwt from 'jsonwebtoken'
import { app } from '../../../../application/index'
import { Role } from '../../../../core/entities/Roles'
import { AppDataSource } from '../../../../infra/datasource/typeorm'
import { CreateDoctorUseCase } from '../../../../application/useCases/CreateDoctorUseCase'
import { CreatePatientUseCase } from '../../../../application/useCases/CreatePatientUseCase'


describe('DoctorsApi', () => {


  const secret = process.env.JWT_SECRET
  const generateToken = (userData) => {
    return jwt.sign(userData, secret, { expiresIn: '1h' }) // Define a expiração como 1 hora
  }

  const doctorUser = { id: 1, name: 'Test Doctor', email: 'doctor@email.com', role: Role.DOCTOR, crm: "123" }
  const doctorToken = generateToken(doctorUser)

  const patientUser = { id: 1, name: 'Test Patient', email: 'patient@email.com', role: Role.PATIENT, cpf: "3123" }
  const patientToken = generateToken(patientUser)

  let doctor
  let patient
  let slot

  it('should be able to list all doctors', async () => {
    const response = await request(await app)
      .get('/api/v1/doctors')
      .set('Authorization', `Bearer ${doctorToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  beforeAll(async () => {
    const createDoctorUseCase = new CreateDoctorUseCase(AppDataSource)
    doctor = await createDoctorUseCase.execute({ name: doctorUser.name, email: doctorUser.email, crm: doctorUser.crm })

    const createPatientUseCase = new CreatePatientUseCase(AppDataSource)
    patient = await createPatientUseCase.execute({ name: patientUser.name, email: patientUser.email, cpf: patientUser.cpf })
  })

  it('should be able to create slot time', async () => {
    const now = new Date()
    const startDate = new Date(now.getTime() + 60 * 60 * 1000)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Adiciona 1 hora (60 minutos * 60 segundos * 1000 milissegundos)

    const response = await request(await app)
      .post('/api/v1/doctors/available-slots')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        email: doctorUser.email,
        startTime: startDate,
        endTime: endDate,
        isAvailable: true
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')

    slot = response.body

  })

  it('should not be able to create slot time', async () => {
    const now = new Date()
    const startDate = new Date(now.getTime() + 60 * 60 * 1000)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Adiciona 1 hora (60 minutos * 60 segundos * 1000 milissegundos)

    const response = await request(await app)
      .post('/api/v1/doctors/available-slots')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        email: doctorUser.email,
        startTime: startDate,
        endTime: startDate,
        isAvailable: true
      })

    expect(response.status).toBe(400)    

  })


  it('should be able to list all doctors', async () => {

    const response = await request(await app)
      .get('/api/v1/doctors')
      .set('Authorization', `Bearer ${patientToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)

  })

  it('should be able to edit an slot', async () => {
    const now = new Date()
    const startDate = new Date(now.getTime() + 60 * 60 * 1000)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Adiciona 1 hora (60 minutos * 60 segundos * 1000 milissegundos)

    const response = await request(await app)
      .patch(`/api/v1/doctors/available-slots/${slot.id}`)
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        startTime: startDate,
        endTime: endDate
      })

    expect(response.status).toBe(200)

  })

  it('should not be able to edit an slot', async () => {
    const now = new Date()
    const startDate = new Date(now.getTime() + 60 * 60 * 1000)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Adiciona 1 hora (60 minutos * 60 segundos * 1000 milissegundos)

    const response = await request(await app)
      .patch(`/api/v1/doctors/available-slots/9999`)
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        startTime: startDate,
        endTime: endDate
      })

    expect(response.status).toBe(400)

  })

  it('should be able to create an appointment', async () => {

    const response = await request(await app)
      .post('/api/v1/doctors/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctorId: doctor.id,
        patientId: patient.id,
        slotId: slot.id
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')

  })

  it('should not be able to create an appointment', async () => {

    const response = await request(await app)
      .post('/api/v1/doctors/appointments')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        doctorId: doctor.id,
        patientId: patient.id,
        slotId: slot.id
      })

    expect(response.status).toBe(400)

  })

  it('should be able to list slots time', async () => {
    const response = await request(await app)
      .get(`/api/v1/doctors/available-slots/${doctor.id}`)
      .set('Authorization', `Bearer ${doctorToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)

  })

})