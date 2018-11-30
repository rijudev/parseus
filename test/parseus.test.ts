// import DummyClass from '../src/parseus'
import 'reflect-metadata'

import { Patient } from '../src/decorators/fields/field'
import { Parseus } from '../src/repository/repository'

test('Test', () => {
  // tslint:disable-next-line:no-unused-expression
  // const jsonPatient = Parseus.toJSON(patient)
  const patient = Parseus.fromJSON({}).to(Patient)
})
