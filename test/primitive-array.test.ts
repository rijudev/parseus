import Parseus, { Field } from '../src'

class Person {
  @Field()
  name: string
  @Field({ type: 'array', factory: String })
  arr: string[]
}

const data = { name: 'julian', arr: [2, 4] }

describe('modlist', () => {
  const result = Parseus.decode(data).to(Person)
  test('Modlist TX parser', () => {
    expect(result.arr[0]).toBe('2')
    expect(result.arr[1]).toBe('4')
  })
})
