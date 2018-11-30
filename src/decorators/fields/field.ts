import { IFieldOptions, FieldType } from '../options/field-options'

export function Field(options?: IFieldOptions): Function {
  return function(context: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const opts: IFieldOptions = { ...options }

    if (!opts.type) {
      const reflectType =
        Reflect && Reflect.getMetadata
          ? Reflect.getMetadata('design:type', context, propertyName)
          : undefined
      opts.type = typeof reflectType === 'function' ? (typeof reflectType() as FieldType) : 'string'
    }

    if (!opts.name) {
      opts.name = propertyName
    }

    const previousMetadata = Reflect.getMetadata('design:parseus-field', context)
    Reflect.defineMetadata(
      'design:parseus-field',
      {
        ...previousMetadata,
        [propertyName]: opts
      },
      context
    )
  }
}

export class Patient {
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
