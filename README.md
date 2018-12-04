# Parseus

Parseus is a javascript library written in Typescript which allow marshall/unmarshall JSON into class instance. This library is able to run in NodeJS, Typescript or any JS platform.

### Usage Javascript (ESNEXT)

```javascript
class Person {
  @Field({ type: 'string', name: 'person_name' })
  name

  @Field({ readOnly: true, name: 'person_age', type: 'number' })
  age

  @Field({ name: 'person_last_name', type: 'string' })
  lastName

  @Field({ name: 'person_gender', default: 'M', type: 'string' })
  gender

  @Field({ name: 'person_created_at', type: 'date' })
  createdAt
}

const data = {
  person_name: 'Jhon',
  person_last_name: 'Smith',
  person_age: 25,
  person_created_at: '2018-01-01T12:00:00.000Z'
}
/**
 *  Returns an instance of Person like
 * {
 *   name:'Jhon',
 *   lastName: 'Smith',
 *   age: 25,
 *   gender: 'M',
 *   createdAt: Mon Jan 01 2018 08:00:00 GMT-0400 (Atlantic Standard Time) {}
 * }
 **/

const person = Parseus.from(data).to(Person)
person.gender = 'F'
person.age = 18
person.name = 'Sara'

/**
 * The second parameter is optional, but if
 * the class instance has been mutated
 * we should pass the original class for references
 *
 * Returns an object with the next structure { [key:string]: any }
 * {
 *   "person_name": "Sara",
 *   "person_last_name": "Smith",
 *   "person_age": 18,
 *   "person_gender": F,
 *   "person_created_at": "2018-01-01T12:00:00.000Z"
 * }
 **/
const personMarshalled = Parseus.toJSON(person, Person)
```

### Usage Typescript

```typescript
class Person {
  @Field({ type: 'string', name: 'person_name' })
  name?: string

  @Field({ readOnly: true, name: 'person_age' })
  age?: number

  @Field({ name: 'person_last_name' })
  lastName?: string

  @Field({ name: 'person_gender', default: 'M' })
  gender?: string

  @Field({ name: 'person_created_at', type: 'date' })
  createdAt?: Date
}

const data = {
  person_name: 'Jhon',
  person_last_name: 'Smith',
  person_age: 25,
  person_created_at: '2018-01-01T12:00:00.000Z'
}
/**
 *  Returns an instance of Person like
 * {
 *   name:'Jhon',
 *   lastName: 'Smith',
 *   age: 25,
 *   gender: 'M',
 *   createdAt: Mon Jan 01 2018 08:00:00 GMT-0400 (Atlantic Standard Time) {}
 * }
 **/

const person = Parseus.from(data).to(Person)
person.gender = 'F'
person.age = 18
person.name = 'Sara'

/**
 * The second parameter is optional, but if
 * the class instance has been mutated
 * we should pass the original class for references
 *
 * Returns an object with the next structure { [key:string]: any }
 * {
 *   "person_name": "Sara",
 *   "person_last_name": "Smith",
 *   "person_age": 18,
 *   "person_gender": F,
 *   "person_created_at": "2018-01-01T12:00:00.000Z"
 * }
 **/
const personMarshalled = Parseus.toJSON(person, Person)
```

Still in progress...
