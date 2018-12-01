import 'reflect-metadata'

import Parseus, { Field } from '../src/parseus'

class Eligibility {
  @Field({
    isVirtual: true,
    type: 'unique'
  })
  key: string

  @Field({
    name: 'patient_eligibility_list_group_id'
  })
  groupId: number
}

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

  @Field({
    name: 'patient_mod_start_date',
    readOnly: true
  })
  modStartDate: string

  @Field({
    name: 'patient_patient_eligibility_list',
    factory: Eligibility
  })
  eligibilities: Eligibility[]

  @Field({
    name: 'patient_eligibility',
    type: 'object'
  })
  eligibility: Eligibility

  @Field({
    name: 'patient_decimal_value',
    precision: 3,
    type: 'decimal'
  })
  decimalValue: number
}

describe('Field Decorator', () => {
  const jsonObj = {
    patient_id: '1',
    patient_patient_num: 'TEST01',
    patient_decimal_value: 0.1234123,
    patient_mod_start_date: '2018-11-30T16:03:39.823571Z',
    patient_patient_eligibility_list: [
      {
        patient_eligibility_list_group_id: 2
      },
      {
        patient_eligibility_list_group_id: 1
      }
    ],
    patient_eligibility: {
      patient_eligibility_list_group_id: 1
    }
  }
  let startDate = new Date().getMilliseconds()
  const patient = Parseus.from(jsonObj).to(Patient)
  let endDate = new Date().getMilliseconds()
  console.log(patient)
  console.log(`Object unmarshalled in ${endDate - startDate} ms`)

  startDate = new Date().getMilliseconds()
  const jsonPat = Parseus.toJSON(patient)
  endDate = new Date().getMilliseconds()
  console.log(jsonPat)
  console.log(`Object marshalled in ${endDate - startDate} ms`)

  test('should convert string number to number', () => {
    expect(typeof patient.id).toBe('number')
    expect(patient.id).toBe(1)
  })

  test('should remains the initial value if readOnly flag is set true', () => {
    patient.modStartDate = 'Hello'
    expect(patient.modStartDate).toBe(jsonObj.patient_mod_start_date)
  })

  test('should convert decimal with 7 precision to 3 precision', () => {
    expect(patient.decimalValue).toBe(0.123)
  })
})
