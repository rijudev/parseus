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
    name: 'patient_eligibility'
  })
  eligibility: Eligibility

  @Field({
    name: 'patient_decimal_value',
    fixed: 3,
    type: 'decimal'
  })
  decimalValue: number

  @Field({
    name: 'test_arr',
    factory: Number
  })
  testArr: number[]
}

const data = {
  patient_id: '1',
  patient_patient_num: 'TEST01',
  patient_decimal_value: 0.1234123,
  patient_mod_start_date: '2018-11-30T16:03:39.823571Z',
  patient_patient_eligibility_list: [
    {
      patient_eligibility_list_group_id: 2
    },
    {
      patient_eligibility_list_group_id: 2
    }
  ],
  patient_eligibility: {
    patient_eligibility_list_group_id: 1
  },
  test_arr: ['1', '2', 4]
}

const runWithTimeLog = <T>(fn: () => T, message = ''): T => {
  const startDate = new Date().getMilliseconds()
  const result = fn()
  const endDate = new Date().getMilliseconds()
  console.log(`${message} ${endDate - startDate} ms`)

  return result
}

describe(`Parseus[payload]`, () => {
  test('should work using to ', () => {
    const marshall: Patient = runWithTimeLog(() => Parseus.from(data).to(Patient))
    const unmarshall: any = runWithTimeLog(() => Parseus.toJSON(marshall))

    expect(marshall.patientNum).toBe('TEST01')
    expect(unmarshall.patient_patient_num).toBe('TEST01')
  })
})
