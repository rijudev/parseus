// import DummyClass from '../src/parseus'
import 'reflect-metadata'

// import { Parseus } from '../src/repository/repository'
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

  // tslint:disable-next-line:no-unused-expression
  // const jsonPatient = Parseus.toJSON(patient)
  const patient = Parseus.fromJSON({}).to(Patient)
})
