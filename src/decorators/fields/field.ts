import { IFieldOptions, FieldType } from '../options/field-options'
import { PARSEUS_META_KEY } from '../../helpers/constant'

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

    const previousMetadata = Reflect.getMetadata(PARSEUS_META_KEY, context)
    Reflect.defineMetadata(
      PARSEUS_META_KEY,
      {
        ...previousMetadata,
        [propertyName]: opts
      },
      context
    )
  }
}
