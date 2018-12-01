import { IFieldOptions, FieldType } from '../options/field-options'
import { PARSEUS_META_KEY } from '../../helpers/constant'

export function Field(options?: IFieldOptions): Function {
  return function(context: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const opts: IFieldOptions = { ...options }
    const reflectType =
      Reflect && Reflect.getMetadata
        ? Reflect.getMetadata('design:type', context, propertyName)
        : undefined

    // console.log(propertyName, reflectType)

    if (!opts.factory) {
      opts.factory = reflectType
    }

    if (!opts.type) {
      if (reflectType === Array) {
        opts.type = 'array'
      } else {
        opts.type =
          typeof reflectType === 'function'
            ? ((typeof reflectType()).toLowerCase() as FieldType)
            : 'string'
      }
    }

    if (!opts.name) {
      opts.name = propertyName
    }

    if (opts.type === 'array') {
      if (!opts.default) {
        opts.default = []
      }
    }

    if (opts.readOnly) {
      const getter = () => {
        return context['_' + propertyName]
      }
      const setter = (newValue: any) => {
        if (context['_' + propertyName]) return
        context['_' + propertyName] = newValue
      }

      // Delete property.
      if (delete context[propertyName]) {
        // Create new property with getter and setter
        Object.defineProperty(context, propertyName, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true
        })
      }
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
