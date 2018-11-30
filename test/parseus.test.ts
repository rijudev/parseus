import 'reflect-metadata'

import Parseus, { Field } from '../src/parseus'

test('Test', () => {
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

  const patient = Parseus.fromJSON({}).to(Patient)
})
