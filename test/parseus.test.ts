import 'reflect-metadata'

import Parseus, { Field } from '../src/parseus'

// Example Class
class Patient {
  @Field({
    isVirtual: true,
    type: 'unique'
  })
  key: string

  @Field({
    name: 'patient_id'
  })
  id: number

  @Field({
    name: 'patient_patient_num'
  })
  patientNum: string
}

describe('Field Decorator', () => {
  const jsonObj = {
    patient_id: '1',
    patient_patient_num: 'TEST01'
  }

  test('should convert string number to number', () => {
    const patient = Parseus.from(jsonObj).to(Patient)
    expect(patient.id).toBe(1)
  })
})
