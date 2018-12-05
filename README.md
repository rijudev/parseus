<h1 align="center">Parseus</h1>

Parseus is a javascript library written in Typescript which allow marshall/unmarshall JSON into class instance. This library is able to run in NodeJS, Typescript or any JS platform.
[API Docs](https://rijudev.github.io/parseus)

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

const person = Parseus.decode(data).to(Person)
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
const personMarshalled = Parseus.encode(person, Person)
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

const person = Parseus.decode(data).to(Person)
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
const personMarshalled = Parseus.encode(person, Person)
```

<h2>Instalation</h2>

1. Install the npm package:

   `npm install parseus --save` or using yarn `yarn add parseus`

2. You need to install `reflect-metadata` shim:

   `npm install reflect-metadata --save` or using yarn `yarn add reflect-metadata` 
  
    and import it somewhere in the global place of your app:

    `import 'reflect-metadata'`


<h2>API</h2>

<h3>FieldType</h3>
Parseus allow the next field type values: 
<ul>
  <li>string</li>
  <li>number</li>
  <li>decimal</li>
  <li>boolean</li>
  <li>unique</li>
  <li>date</li>
  <li>array</li>
  <li>object</li>
</ul>

<h3>Field Options</h3>

| Property    | Description                                                                                                            | Type         | Default  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ | -------- |
| type        | Field type. Must be one of the values from the FieldType                                                               | string       | 'string' |
| name        | Key name in source object. if this value is not provided it takes the model field's name wrapped                       | string       | -        |
| isVirtual   | Indicates if field's value is ignored when marshall Object                                                             | boolean      | false    |
| default     | Indicates the initial field's value                                                                                    | any          | -        |
| readOnly    | Indicates if field's value is read only (freeze)                                                                       | boolean      | false    |
| fixed       | The scale for a decimal (exact numeric) field, which represents the number of digits to the right of the decimal point | number       | 6        |
| transformer | Specifies a value transformer that is to be used to (un)marshall the current field when (un)marshall                   | ITransformer | -        |
| factory     | Indicates the field's model class of target                                                                            | class        | -        |

<h3>ITransformer</h3>

| Property | Description                                          | Type     | Default |
| -------- | ---------------------------------------------------- | -------- | ------- |
| to       | Used to marshall data when writing to the new object | Function | -       |
| from     | Used to unmarshall data when reading from object     | Function | -       |

<h3>ITransformerParams</h3>

| Property | Description                   | Type          | Default |
| -------- | ----------------------------- | ------------- | ------- |
| key      | key name in source object     | string        | -       |
| options  | Field type options field's    | IFieldOptions | -       |
| data     | complete mapped source object | object        | -       |

Still in progress...
