import Parseus, { Field } from '../src/parseus'
import { Parse } from '../src/parses/parse'

class Person {
  @Field({ name: 'person_age' })
  age?: number

  @Field({ name: 'person_sibilings' })
  sibilings?: number

  @Field({ name: 'person_default' })
  default?: number
}

const personData = {
  person_age: '26',
  person_sibilings: '22',
  person_default: undefined
}

let _person: any = null

describe(`Usage cross places`, () => {
  const person = Parseus.from(personData).to(Person)
  _person = person
})

describe(`Usage cross places 2`, () => {
  test(
    'deberia tener una forma de parsear una data nueva sin tener que haber corrido un Parseus.from(personData).to(Person) anteriormente' +
      'estas asumiento que el proceso va a ser directo y mutable siempre' +
      'y en la practica la data pasa por procesos no mutables y mutables ',
    () => {
      const personJson: any = Parseus.toJSON({ ..._person })
      expect(_person.age).toBe(26)
      expect(personJson.person_age).toBe(26)
    }
  )
})
